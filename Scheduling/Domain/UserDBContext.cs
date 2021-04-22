using Microsoft.EntityFrameworkCore;
using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Domain
{
    public class UserDBContext : DbContext
    {
        public UserDBContext(DbContextOptions<UserDBContext> options) : base(options)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<UserPermission> UserPermissions { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<UserTeams> userTeams { get; set; }
        public DbSet<VacationRequest> VacationRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1321313,
                Email = "admin@gmail.com",
                Password = "5dj3bhWCfxuHmONkBdvFrA==",
                Name = "Admin",
                Surname = "Adminov",
                Position = "lol",
                Department = "Memes",
                Salt = "91ed90df-3289-4fdf-a927-024b24bea8b7",
            });

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 13213133,
                Email = "user@gmail.com",
                Password = "u9DAYiHl+liIqRMvuuciBA==",
                Name = "User",
                Surname = "Userov",
                Position = "lol",
                Department = "Memes",
                Salt = "f0e30e73-fac3-4182-8641-ecba862fed69",
            });

            modelBuilder.Entity<Permission>().HasData(new Permission { 
                Id = 1,
                Name = "Access to vacation approvals"
            });

            modelBuilder.Entity<Permission>().HasData(new Permission { 
                Id = 2,
                Name = "Accountant"
            });
            
            modelBuilder.Entity<Permission>().HasData(new Permission { 
                Id = 3,
                Name = "Part-time"
            });
            
            modelBuilder.Entity<Permission>().HasData(new Permission { 
                Id = 4,
                Name = "Full-time"
            });
            
            modelBuilder.Entity<Permission>().HasData(new Permission { 
                Id = 5,
                Name = "Access to team management"
            });

            modelBuilder.Entity<Permission>().HasData(new Permission
            {
                Id = 6,
                Name = "Access to global management"
            });

            modelBuilder.Entity<UserPermission>().HasData(new UserPermission
            { 
                Id = 3,
                PermisionId = 1,
                UserId = 1321313
            });

            modelBuilder.Entity<UserPermission>().HasData(new UserPermission
            { 
                Id = 4,
                PermisionId = 3,
                UserId = 13213133
            });
            
            modelBuilder.Entity<UserPermission>().HasData(new UserPermission
            { 
                Id = 5,
                PermisionId = 6,
                UserId = 1321313
            });
            
            modelBuilder.Entity<Team>().HasData(new Team
            { 
                Id = 6,
                CreatorId = 1321313,
                Name = "Development"
            });

            modelBuilder.Entity<UserTeams>().HasData(new UserTeams
            {
                Id = 1,
                UserId = 13213133,
                TeamId = 6
            });

            modelBuilder.Entity<VacationRequest>().HasData(new VacationRequest
            {
                Id = 1,
                UserId = 13213133,
                StartDate = new DateTime(2021, 04, 20),
                FinishDate = new DateTime(2021, 05, 20),
                Status = "Declined. Declined by PM. Declined by TL.",
                Comment = "I want to see a bober."
            });

            modelBuilder.Entity<VacationRequest>().HasData(new VacationRequest
            {
                Id = 2,
                UserId = 13213133,
                StartDate = new DateTime(2021, 04, 22),
                FinishDate = new DateTime(2021, 04, 28),
                Status = "Declined. Declined by PM. Declined by TL.",
                Comment = "I really want to see a bober."
            });

            modelBuilder.Entity<VacationRequest>().HasData(new VacationRequest
            {
                Id = 3,
                UserId = 13213133,
                StartDate = new DateTime(2021, 04, 25),
                FinishDate = new DateTime(2021, 04, 29),
                Status = "Pending consideration...",
                Comment = "Please, it`s my dream to see a bober."
            });

        }
    }
}
