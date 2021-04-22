using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Models
{
    public class ComputedProps
    {
        public int Id { get; set; }
        public List<Permission> Permissions { get; set; }
        public List<Team> Teams { get; set; }

        public ComputedProps()
        {

        }
        public void AddPermission(List<Permission> permissions)
        {
            Permissions = permissions;
            /*foreach (Permission permission in permissions)
                Permissions.Add(permission.Name);*/
        }
    }
}
