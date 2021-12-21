using System.Collections.Generic;
using WorkerSearchApp.Dto;
using WorkerSearchApp.Dto.Client;

namespace WorkerSearchApp.Services
{
    public interface ITicketsService
    {
        TicketInfoResponseDto Get(int ticketId);

        IReadOnlyCollection<TicketInfoResponseDto> GetNotClosed(int? categoryId);

        IReadOnlyCollection<TicketInfoResponseDto> GetAll(int userId);

        TicketInfoResponseDto Add(TicketInfoRequestDto ticket);

        TicketInfoResponseDto Close(int ticketId);
    }
}