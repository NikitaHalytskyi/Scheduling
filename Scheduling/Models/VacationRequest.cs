using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Models
{
    public class VacationRequest
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public string Status { get; set; }
        public string Comment { get; set; }
        public VacationRequest()
        {

        }
    }
}
