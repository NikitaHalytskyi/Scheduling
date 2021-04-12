using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Scheduling.Domain;
using Scheduling.Models;
using Scheduling.Utils;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Scheduling.Services
{
    public interface IIdentityService
    {
        string Authenticate(string email, string password);
    }
    public class IdentityService : IIdentityService
    {
        readonly UserRepository userRepository;
        readonly IConfiguration Configuration;
        public IdentityService(UserRepository userRepository, IConfiguration configuration)
        {
            this.userRepository = userRepository;
            Configuration = configuration;
        }
        public string Authenticate(string email, string password)
        {
            User user = userRepository.Get(email);

            if (user == null || user.Password != Hashing.GetHashString(password + user.Salt)) { return ""; }

            user.AddPermission(userRepository.GetPermission(email));
            return GenerateAccessToken(email, user.Id.ToString(), user.Permissions);

        }
        private string GenerateAccessToken(string email, string userId, List<string> permissons)
        {

            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("SecretKey").Value));
            SigningCredentials signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            List<Claim> claims = new List<Claim>
            {
                new Claim("Id", userId),
                new Claim("Email", email),
            };

            claims = claims.Concat(permissons.Select(permisson => new Claim("permission", permisson))).ToList();

            JwtSecurityToken token = new JwtSecurityToken(
                "issuer",
                "audience",
                claims,
                expires: DateTime.Now.AddDays(90),
                signingCredentials: signingCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
