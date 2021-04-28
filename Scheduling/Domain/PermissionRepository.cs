using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Domain
{
    public partial class DataBaseRepository
    {

        public List<UserPermission> GetPermission(int id)
        {
            User user = Context.Users.FirstOrDefault(user => user.Id == id);
            if (user == null)
                return new List<UserPermission>();

            
            return user.UserPermissions;
        }

        public void CreateUserPermission(int userId, PermissionName permissisonName)
        {
            Permission permission = Context.Permissions.FirstOrDefault(permission => permission.Name == permissisonName);
            if (permission == null)
                return;

            UserPermission userPermission = new UserPermission() { UserId = userId, PermissionId = permission.Id };
            Context.UserPermissions.Add(userPermission);
            Context.SaveChanges();
        }

        public List<Permission> GetAllPermissions()
        {
            return Context.Permissions.ToList();
        }

        public bool RemoveUserPermission(int userId, PermissionName permissionName)
        {
            Permission permission = Context.Permissions.FirstOrDefault(permission => permission.Name == permissionName);
            if (permission == null)
                return false;

            UserPermission userPermission = Context.UserPermissions.FirstOrDefault(perm => perm.PermissionId == permission.Id && perm.UserId == userId);
            if (userPermission == null)
                return false;

            Context.UserPermissions.Remove(userPermission);
            Context.SaveChanges();
            return true;
        }

        public bool RemoveUserPermissions(int userId)
        {
            List<UserPermission> userPermissions = Context.UserPermissions.Where(permission => permission.UserId == userId).ToList();

            if (userPermissions.Count == 0)
                return false;
            userPermissions.Clear();
            Context.SaveChanges();
            return true;
        }


    }
}
