using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Models
{
    public class UserPermission
    {
        [Key]
        public int Id { get; set; }
        public int PermisionId { get; set; }
        public int UserId { get; set; }
    }
}
