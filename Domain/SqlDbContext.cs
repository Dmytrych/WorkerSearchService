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
                Categories.Add(new CategoryEntity {Name = "Перевозки"});
                Categories.Add(new CategoryEntity {Name = "Домашні послуги"});
                Categories.Add(new CategoryEntity {Name = "Копірайт"});
                SaveChanges();
            }
        }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(
                "Data Source=DESKTOP-4FGGBK0\\MSSQLSERVER01;Initial Catalog=WorkerSearchApp;Integrated Security=True;");
        }

        public DbSet<OrderEntity> Orders { get; set; }
        
        public DbSet<UserEntity> Users { get; set; }
        
        public DbSet<TicketEntity> Tickets { get; set; }
        
        public DbSet<CategoryEntity> Categories { get; set; }
    }
}