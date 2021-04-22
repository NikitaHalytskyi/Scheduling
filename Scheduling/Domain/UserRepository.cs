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

        public User CreateUser(string name, string surname, string email, string password, List<string> permission, List<int> teams)
        {
            string userId = Guid.NewGuid().ToString();
            string salt = Guid.NewGuid().ToString();

            User checkUser = Context.Users.FirstOrDefault(user => user.Email == email);

            if (checkUser != null)
            {
                return new User();
            }

            User user = new User()
            {
                Email = email,
                Password = Hashing.GetHashString(password + salt),
                Name = name,
                Surname = surname,
                Position = "",
                Department = "",
                Salt = salt
            };


            Context.Users.Add(user);
            Context.SaveChanges();

            User newUser = Context.Users.Single(user => user.Email == email);

            foreach (string perm in permission)
            {
                CreateUserPermission(newUser.Id, perm);
            }

            if (teams == null)
                return newUser;

            foreach (int teamId in teams)
            {
                AddUserToTeam(user.Id, teamId);
            }

            return newUser;
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

            foreach (Permission permmision in user.ComputedProps.Permissions)
            {
                CreateUserPermission(user.Id, permmision.Name);
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
