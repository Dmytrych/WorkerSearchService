using System.Collections.Generic;
using System.Linq;
using WorkerSearchApp.Domain.Dto;
using WorkerSearchApp.Dto;

namespace WorkerSearchApp.Domain.Repositories
{
    public class TicketsRepository : ITicketsRepository
    {
        private readonly IDatabaseContext dbContext;
        
        public TicketsRepository(IDatabaseContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IReadOnlyCollection<Ticket> GetNotClosed(int categoryId)
            => dbContext.Tickets
                .Where(t => t.CategoryId == categoryId && !t.Closed)
                .Select(ToServerDto)
                .ToList();
        
        public IReadOnlyCollection<Ticket> GetAll(int userId)
            => dbContext.Tickets
                .Where(t => t.OwnerId == userId)
                .Select(ToServerDto)
                .ToList();

        public Ticket Add(Ticket ticket)
        {
            if (ticket == null)
            {
                return null;
            }

            if (ticket.CategoryId <= 0)
            {
                return null;
            }

            var addedTicket = dbContext.Tickets.Add(ToEntity(ticket));
            dbContext.SaveChanges();

            return addedTicket?.Entity != null 
                ? ToServerDto(addedTicket.Entity) 
                : null;
        }
        
        public Ticket Close(int ticketId)
        {
            var foundTicket = dbContext.Tickets.FirstOrDefault(t => t.Id == ticketId);

            if (foundTicket == null)
            {
                return null;
            }

            foundTicket.Closed = true;
            dbContext.Tickets.Update(foundTicket);

            return ToServerDto(foundTicket);
        }

        private Ticket ToServerDto(TicketEntity ticketEntity)
            => new Ticket
            {
                Id = ticketEntity.Id,
                CategoryId = ticketEntity.CategoryId,
                Closed = ticketEntity.Closed,
                Description = ticketEntity.Description,
                OwnerId = ticketEntity.OwnerId,
                PhoneNumber = ticketEntity.PhoneNumber
            };
        
        private TicketEntity ToEntity(Ticket ticket)
            => new TicketEntity
            {
                Id = ticket.Id,
                CategoryId = ticket.CategoryId,
                Closed = ticket.Closed,
                Description = ticket.Description,
                OwnerId = ticket.OwnerId,
                PhoneNumber = ticket.PhoneNumber,
            };
    }
}