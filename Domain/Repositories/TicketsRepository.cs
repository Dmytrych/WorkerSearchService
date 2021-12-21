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

        public Ticket Get(int ticketId)
        {
            var ticket = dbContext.Tickets.FirstOrDefault(t => t.Id == ticketId);
            return ticket != null ? ToServerDto(ticket) : null;
        }

        public IReadOnlyCollection<Ticket> GetNotClosed(int? categoryId)
        {
            IQueryable<TicketEntity> tickets = dbContext.Tickets;

            if (categoryId != null)
            {
                tickets = tickets.Where(t => t.CategoryId == categoryId && !t.Closed);
            }
            
            return tickets.Select(ToServerDto).ToList();
        }
        
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
            dbContext.SaveChanges();

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
                PhoneNumber = ticketEntity.PhoneNumber,
                Name = ticketEntity.Name,
                Price = ticketEntity.Price
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
                Name = ticket.Name,
                Price = ticket.Price
            };
    }
}