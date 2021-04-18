using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Models
{
    public class GraphQLFields
    {
        public List<string> Permissions { get; set; }
        public List<Team> Teams { get; set; }

        public GraphQLFields()
        {

        }
        public void AddPermission(List<Permission> permissions)
        {
            Permissions = new List<string>();
            foreach (Permission permission in permissions)
                Permissions.Add(permission.Name);
        }
    }
}
