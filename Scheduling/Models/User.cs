using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Position { get; set; }
        public string Department { get; set; }
        public string Salt { get; set; }

        [NotMapped]
        public List<string> Permissions { get; set; }

        public User()
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
