using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Language.AST;
using GraphQL.Types;
using Scheduling.Models;

namespace Scheduling.GraphQl.Types
{
    public class PermissionNameEnum : EnumerationGraphType<PermissionName>
    {
        public PermissionNameEnum()
        {
            Name = "PermissionName";
            Description = "One of the possible permissions";
            /*AddValue(PermissionName.UserManagement.ToString(), "Access to user management.", 0);
            AddValue(PermissionName.Accountant.ToString(), "Access to reports", 1);
            AddValue(PermissionName.PartTime.ToString(), "Access to timer", 2);
            AddValue(PermissionName.FullTime.ToString(), "", 3);
            AddValue(PermissionName.VacationApprovals.ToString(), "Access to vacation approvals.", 4);*/
        }
    }
}
