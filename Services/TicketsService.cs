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

        public IReadOnlyCollection<TicketInfoResponseDto> GetNotClosed(int categoryId)
        {
            var notClosedTickets = ticketsRepository.GetNotClosed(categoryId);

            return !notClosedTickets.Any() ? null : ToResponseCollection(notClosedTickets);
        }

        public IReadOnlyCollection<TicketInfoResponseDto> GetAll(int userId)
        {
            var tickets = ticketsRepository.GetAll(userId);
            
            return !tickets.Any() ? null : ToResponseCollection(tickets);
        }

        public TicketInfoResponseDto Add(Ticket ticket)
        {
            if (string.IsNullOrEmpty(ticket.Description) 
                || ticket.CategoryId <= 0 
                || string.IsNullOrEmpty(ticket.PhoneNumber)
                || ticket.OwnerId <= 0)
            {
                return null;
            }

            var addedTicket = ticketsRepository.Add(ticket);

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
                Closed = ticket.Closed,
            };
    }
}