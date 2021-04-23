using Microsoft.EntityFrameworkCore;
using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Domain
{
    public partial class DataBaseRepository
    {
        public async Task<IReadOnlyCollection<TimerHistory>> GetTimerHistory()
        {
            return await Context.TimerHistories.AsNoTracking().ToListAsync();
        }
        public List<TimerHistory> GetTimerHistory(string email)
        {
            //return Context.TimerHistory.ToList();

            User user = Context.Users.FirstOrDefault(user => user.Email == email);

            if (user == null)
                return new List<TimerHistory>();

            List<UserTimerHistory> userTimerHistories = Context.UserTimerHistories.Where(timerHistory => timerHistory.UserId == user.Id).ToList<UserTimerHistory>();

            List<TimerHistory> timerHistories = new List<TimerHistory>();

            foreach (UserTimerHistory userTimerHistory in userTimerHistories)
            {
                timerHistories.Add(Context.TimerHistories.SingleOrDefault(timerHistory => timerHistory.Id == userTimerHistory.TimerHistoryId));
            }
            return timerHistories;
        }
        public TimerHistory AddTimerStartValue(DateTime? startTimeArg)
        {
            DateTime? startTime = null;

            if (startTimeArg != null)
            {
                startTime = startTimeArg.Value;
            }


            var TimerValues = new TimerHistory()
            {
                StartTime = startTime
            };
            Context.Add(TimerValues);
            Context.SaveChanges();

            return TimerValues;
        }
        public TimerHistory EditTimerValue(int id, DateTime? startTime, DateTime? finishtTime)
        {

            var dbRecord = Context.TimerHistories.Single(timerHistory => timerHistory.Id == id);

            if (finishtTime == new DateTime())
            {
                finishtTime = dbRecord.FinishTime;
            }

            if (startTime == new DateTime())
            {
                startTime = dbRecord.StartTime;
            }
            dbRecord.FinishTime = finishtTime;

            dbRecord.StartTime = startTime;

            var TimerValues = new TimerHistory()
            {
                Id = id,
                StartTime = startTime,
                FinishTime = finishtTime
            };
            //Context.TimerHistories.Single(timerHistory => timerHistory.Id == id).FinishTime = finishtTime;

            //Context.Update(TimerValues);
            Context.SaveChanges();

            return TimerValues;
        }
        public TimerHistory DeteleTimerValue(int id)
        {
            var dbRecord = Context.TimerHistories.Single(timerHistory => timerHistory.Id == id);

            Context.Remove(dbRecord);

            var TimerValues = new TimerHistory()
            {
                Id = id,
                StartTime = dbRecord.StartTime,
                FinishTime = dbRecord.FinishTime
            };
            //Context.TimerHistories.Single(timerHistory => timerHistory.Id == id).FinishTime = finishtTime;

            //Context.Update(TimerValues);
            Context.SaveChanges();

            return TimerValues;
        }
    }
}
