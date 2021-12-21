using System.Collections.Generic;
using System.Linq;
using WorkerSearchApp.Domain.Repositories;
using WorkerSearchApp.Dto;
using WorkerSearchApp.Dto.Client;

namespace WorkerSearchApp.Services
{
    public class TicketsService : ITicketsService
    {
        private readonly ITicketsRepository ticketsRepository;
        private readonly ICategoryRepository categoryRepository;
        private readonly IUserRepository userRepository;
        
        public TicketsService(ITicketsRepository ticketsRepository, ICategoryRepository categoryRepository, IUserRepository userRepository)
        {
            this.ticketsRepository = ticketsRepository;
            this.categoryRepository = categoryRepository;
            this.userRepository = userRepository;
        }
        
        public TicketInfoResponseDto Get(int ticketId)
        {
            var notClosedTickets = ticketsRepository.Get(ticketId);

            return notClosedTickets == null ? null : ToResponseDto(notClosedTickets);
        }

        public IReadOnlyCollection<TicketInfoResponseDto> GetNotClosed(int? categoryId)
        {
            var notClosedTickets = ticketsRepository.GetNotClosed(categoryId);

            return notClosedTickets != null ? ToResponseCollection(notClosedTickets) : null;
        }

        public IReadOnlyCollection<TicketInfoResponseDto> GetAll(int userId)
        {
            var tickets = ticketsRepository.GetAll(userId);
            
            return tickets != null ? ToResponseCollection(tickets) : null;
        }

        public TicketInfoResponseDto Add(TicketInfoRequestDto ticket)
        {
            if (string.IsNullOrEmpty(ticket.Description.Trim()) 
                || string.IsNullOrEmpty(ticket.Name.Trim())
                || ticket.CategoryId <= 0 
                || ticket.UserId <= 0)
            {
                return null;
            }

            var user = userRepository.GetUser(ticket.UserId);

            if (user == null)
            {
                return null;
            }

            ticket.PhoneNumber = user.PhoneNumber;

            var addedTicket = ticketsRepository.Add(ToServerDto(ticket));

            return addedTicket != null ? ToResponseDto(addedTicket) : null;
        }

        public TicketInfoResponseDto Close(int ticketId)
        {
            var ticket = ticketsRepository.Close(ticketId);

            return ticket != null ? ToResponseDto(ticket) : null;
        }

        private IReadOnlyCollection<TicketInfoResponseDto> ToResponseCollection(IReadOnlyCollection<Ticket> tickets)
            => tickets.Select(ToResponseDto).ToList();

        private TicketInfoResponseDto ToResponseDto(Ticket ticket)
            => new TicketInfoResponseDto
            {
                Id = ticket.Id,
                Owner = userRepository.GetUser(ticket.OwnerId),
                Description = ticket.Description,
                PhoneNumber = ticket.PhoneNumber,
                Category = categoryRepository.Get(ticket.CategoryId),
                IsClosed = ticket.Closed,
                Name = ticket.Name,
                Price = ticket.Price
            };
        
        private Ticket ToServerDto(TicketInfoRequestDto ticket)
            => new Ticket
            {
                OwnerId = ticket.UserId,
                Description = ticket.Description,
                PhoneNumber = ticket.PhoneNumber,
                CategoryId = ticket.CategoryId,
                Closed = ticket.IsClosed,
                Name = ticket.Name,
                Price = ticket.Price
            };
    }
}