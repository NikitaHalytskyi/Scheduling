using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Domain
{
    public partial class DataBaseRepository
    {
        public void CreateTeam(string name, int creatorId) =>
           Context.Teams.Add(new Team { Name = name, CreatorId = creatorId });

        public bool RemoveTeam(int teamId)
        {
            Team team = Context.Teams.FirstOrDefault(team => team.Id == teamId);
            if (team == null)
                return false;

            List<UserTeams> userTeams = Context.userTeams.Where(userTeam => userTeam.TeamId == teamId).ToList();

            foreach (UserTeams userTeam in userTeams)
            {
                Context.Remove(userTeam);
            }

            Context.Teams.Remove(team);
            Context.SaveChanges();
            return true;
        }

        public bool EditTeam(Team team)
        {
            Team removedTeam = Context.Teams.FirstOrDefault(t => t.Id == team.Id);

            if (removedTeam == null)
                return false;

            Context.Remove(removedTeam);
            Context.Add(team);
            Context.SaveChanges();

            return true;
        }

        public void AddUserToTeam(int userId, int teamId)
        {
            if (
                Context.Teams.FirstOrDefault(team => team.Id == teamId) == null
                || Context.Users.FirstOrDefault(user => user.Id == userId) == null
            )
            {
                return;
            }

            Context.userTeams.Add(new UserTeams { TeamId = teamId, UserId = userId });
            Context.SaveChanges();
        }

        public void RemoveUserFromTeam(int userId, int teamId)
        {
            if (
                Context.Teams.FirstOrDefault(team => team.Id == teamId) == null
                || Context.Users.FirstOrDefault(user => user.Id == userId) == null
            )
            {
                return;
            }

            Context.userTeams.Remove(Context.userTeams.FirstOrDefault(team => team.TeamId == teamId && team.UserId == userId));
            Context.SaveChanges();
        }

        public List<Team> GetListOfAvailableTeams(int id) =>
            Context.Teams.Where(team => team.CreatorId == id).ToList();

        public List<Team> GetUserTeams(int id)
        {
            List<UserTeams> userTeams = Context.userTeams.Where(team => team.UserId == id).ToList();
            List<Team> teams = new List<Team>();

            foreach (UserTeams team in userTeams)
            {
                teams.Add(Context.Teams.FirstOrDefault(t => t.Id == team.TeamId));
            }

            return teams;
        }

        public List<User> GetTeamUsers(int teamId)
        {
            List<UserTeams> userTeams = Context.userTeams.Where(team => team.TeamId == teamId).ToList();
            List<User> users = new List<User>();

            foreach (UserTeams teams in userTeams)
            {
                users.Add(Context.Users.FirstOrDefault(user => user.Id == teams.UserId));
            }

            return users;
        }

    }
}
