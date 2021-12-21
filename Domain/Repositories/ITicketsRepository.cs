using System.Collections.Generic;
using WorkerSearchApp.Dto;

namespace WorkerSearchApp.Domain.Repositories
{
    public interface ITicketsRepository
    {
        IReadOnlyCollection<Ticket> GetNotClosed(int? categoryId);

        public IReadOnlyCollection<Ticket> GetAll(int userId);

        Ticket Add(Ticket ticket);

        Ticket Close(int ticketId);

        Ticket Get(int ticketId);
    }
}