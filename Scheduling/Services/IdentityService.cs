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
        Login Authenticate(string email, string password);
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
        public Login Authenticate(string email, string password)
        {
            User user = userRepository.Get(email);
            user.AddPermission(userRepository.GetPermission(email));

            if (user != null && user.Password == Hashing.GetHashString(password + user.Salt))
                return GenerateAccessToken(email, user.Id.ToString(), user.Permissons) ;

            return new Login();

        }
        private Login GenerateAccessToken(string email, string userId, List<string> permissons)
        {
            Login login = new Login();

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

            login.Token = new JwtSecurityTokenHandler().WriteToken(token);

            return login;
        }
    }
}
