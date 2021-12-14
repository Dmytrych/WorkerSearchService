using System.Collections.Generic;
using WorkerSearchApp.Dto;
using WorkerSearchApp.Dto.Client;

namespace WorkerSearchApp.Services
{
    public interface ITicketsService
    {
        IReadOnlyCollection<TicketInfoResponseDto> GetNotClosed(int categoryId);

        IReadOnlyCollection<TicketInfoResponseDto> GetAll(int userId);

        TicketInfoResponseDto Add(Ticket ticket);

        TicketInfoResponseDto Close(int ticketId);
    }
}