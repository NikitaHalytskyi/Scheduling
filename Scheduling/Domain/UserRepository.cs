using Scheduling.Models;
using Scheduling.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Domain
{
    public partial class DataBaseRepository
    {
        public IEnumerable<User> Get() =>
          Context.Users;

        public User Get(string email) =>
            Context.Users.FirstOrDefault(user => user.Email == email);

        public User CreateUser(string name, string surname, string email, string password, List<PermissionName> permissions, int teamId)
        {
            string userId = Guid.NewGuid().ToString();
            string salt = Guid.NewGuid().ToString();

            User checkUser = Context.Users.FirstOrDefault(user => user.Email == email);

            if (checkUser != null)
            {
                return null/* new User()*/;
            }

            var team = Context.Teams.FirstOrDefault(t => t.Id == teamId);

            User user = new User()
            {
                Email = email,
                Password = Hashing.GetHashString(password + salt),
                Name = name,
                Surname = surname,
                Position = "",
                Department = "",
                Salt = salt,
                Team = team
            };

            foreach (PermissionName perm in permissions)
            {
                CreateUserPermission(user.Id, perm);
            }

            Context.Users.Add(user);
            Context.SaveChanges();
            return user;
            User newUser = Context.Users.Single(user => user.Email == email);


            /*if (teamId == null)
                return newUser;*/

           /* foreach (int teamId in teams)
            {
                AddUserToTeam(user.Id, teamId);
            }*/

            //return newUser;
        }


        public bool RemoveUser(string email)
        {
            User user = Context.Users.FirstOrDefault(user => user.Email == email);

            if (user == null)
                return false;

            RemoveUserPermissions(user.Id);

            List<UserTeams> teams = Context.userTeams.Where(team => team.UserId == user.Id).ToList();
            foreach (UserTeams team in teams)
            {
                RemoveUserFromTeam(team.UserId, team.TeamId);
            }

            Context.Users.Remove(user);
            Context.SaveChanges();
            return true;
        }

        public bool EditUser(User user)
        {

            if (!RemoveUser(user.Email))
                return false;

            List<Team> teams = GetUserTeams(user.Id);

            RemoveUserPermissions(user.Id);

            foreach (UserPermission permmission in user.UserPermissions)
            {
                CreateUserPermission(user.Id, permmission.Permission.Name);
            }

            foreach (Team team in teams)
            {
                AddUserToTeam(user.Id, team.Id);
            }

            Context.Users.Add(user);
            Context.SaveChanges();
            return true;
        }

    }
}
