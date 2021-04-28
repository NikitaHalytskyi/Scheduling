using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            AddValue("UserManagement", "Access to user management.", 0);
            AddValue("Accountant", "Access to reports", 1);
            AddValue("PartTime", "Access to timer", 2);
            AddValue("FullTime", "", 3);
            AddValue("VacationApprovals", "Access to vacation approvals.", 4);
        }
    }
}
