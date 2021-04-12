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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1321313,
                Email = "admin@gmail.com",
                Password = "yZFts5ive5Fl+fWw5FoH7A==",
                Name = "User",
                Surname = "UserS",
                Position = "lol",
                Department = "Memes",
                Salt = "91ed90df-3289-4fdf-a927-024b24bea8b7",
            });

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 13213133,
                Email = "user@gmail.com",
                Password = "gdR8Hyv4h8sV5WBeqgbZ3A==",
                Name = "User",
                Surname = "UserS",
                Position = "lol",
                Department = "Memes",
                Salt = "f0e30e73-fac3-4182-8641-ecba862fed",
            });

            modelBuilder.Entity<Permission>().HasData(new Permission { 
                Id = 1,
                Name = "canManageUsers"
            });

            modelBuilder.Entity<Permission>().HasData(new Permission { 
                Id = 2,
                Name = "isPartTime"
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
                PermisionId = 2,
                UserId = 13213133
            });
            
            modelBuilder.Entity<UserPermission>().HasData(new UserPermission
            { 
                Id = 5,
                PermisionId = 2,
                UserId = 1321313
            });

            

        }
    }
}
