using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using Scheduling.Models;

namespace Scheduling.GraphQl.Types
{
    public class UserPermissionType : ObjectGraphType<UserPermission>
    {
        public UserPermissionType()
        {
            Name = "UserPermission";
            Field(up => up.Permission, type: typeof(PermissionType)).Description("Permission");
            Field(up => up.PermissionId).Description("PermissionId");
            Field(up => up.User, type: typeof(UserType)).Description("User");
            Field(up => up.UserId).Description("UserId");
        }
    }
}
