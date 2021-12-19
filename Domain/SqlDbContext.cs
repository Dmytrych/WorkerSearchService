using System.Linq;
using Microsoft.EntityFrameworkCore;
using WorkerSearchApp.Domain.Dto;

namespace WorkerSearchApp.Domain
{
    public class SqlDbContext : DbContext, IDatabaseContext
    {
        public SqlDbContext()
        {
            Database.EnsureCreated();
            if (!Categories.Any())
            {
                Categories.Add(new CategoryEntity {Name = "Plumbing"});
                Categories.Add(new CategoryEntity {Name = "Cleaning"});
                Categories.Add(new CategoryEntity {Name = "Cooking"});
                SaveChanges();
            }
        }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(
                "Data Source=DESKTOP-B69V4OT;Initial Catalog=WorkerSearchApp;Integrated Security=True;");
        }

        public DbSet<OrderEntity> Orders { get; set; }
        
        public DbSet<UserEntity> Users { get; set; }
        
        public DbSet<TicketEntity> Tickets { get; set; }
        
        public DbSet<CategoryEntity> Categories { get; set; }
    }
}