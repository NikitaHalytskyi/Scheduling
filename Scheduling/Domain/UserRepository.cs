using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Domain
{
    interface IUserRepository
    {
        IEnumerable<User> Get();
        User Get(string email);

        List<Permission> GetPermission(string email);
    }

    public class UserRepository : IUserRepository
    {
        readonly UserDBContext Context;

        public UserRepository(UserDBContext context)
        {
            Context = context;
        }

        public IEnumerable<User> Get()
        {
            return Context.Users;
        }

        public User Get(string email)
        {
            return Context.Users.FirstOrDefault(user => user.Email == email);
        }

        public List<Permission> GetPermission(string email)
        {
            User user = Context.Users.FirstOrDefault(user => user.Email == email);
            if (user == null)
                return new List<Permission>();

            List<UserPermission> userPermissions = Context.UserPermissions.Where(permission => permission.UserId == user.Id).ToList<UserPermission>();
            List<Permission> permissions = new List<Permission>();

            foreach (UserPermission userPermission in userPermissions)
            {
                permissions.Add(Context.Permissions.Single(permission => permission.Id == userPermission.PermisionId));
            }
            return permissions;
        }
    }
}
