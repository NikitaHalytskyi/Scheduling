using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scheduling.Models;
using Scheduling.Utils;

namespace Scheduling.Domain
{
    public partial class DataBaseRepository
    {
        public List<VacationRequest> GetUserRequests(int userId)
        {
            List<VacationRequest> requests = Context.VacationRequests.Where(r => r.UserId == userId).ToList();
            return requests;

        }
        public List<VacationRequest> AddRequest(int userId, DateTime startDate, DateTime finishDate, string status, string comment)
        {
            VacationRequest vacationRequest = new VacationRequest()
            {
                UserId = userId,
                StartDate = startDate,
                FinishDate = finishDate,
                Status = status,
                Comment = comment,
            };

            Context.VacationRequests.Add(vacationRequest);
            Context.SaveChanges();

            return GetUserRequests(userId);

        }
        public List<VacationRequest> RemoveRequest(int id)
        {
            VacationRequest vacationRequest = Context.VacationRequests.Single(u => u.Id == id);
            Context.VacationRequests.Remove(vacationRequest);
            Context.SaveChanges();

            return GetUserRequests(vacationRequest.UserId);

        }
    }
}
