using Microsoft.EntityFrameworkCore;
using WorkerSearchApp.Domain.Dto;

namespace WorkerSearchApp.Domain
{
    public interface IDatabaseContext
    {
        int SaveChanges();
        
        DbSet<OrderEntity> Orders { get; set; }
        
        DbSet<UserEntity> Users { get; set; }
        
        DbSet<TicketEntity> Tickets { get; set; }
        
        DbSet<CategoryEntity> Categories { get; set; }
    }
}