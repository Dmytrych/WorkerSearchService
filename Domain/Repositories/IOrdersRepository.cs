using System.Collections.Generic;
using WorkerSearchApp.Dto;

namespace WorkerSearchApp.Domain.Repositories
{
    public interface IOrdersRepository
    {
        Order Get(int orderId);

        IReadOnlyCollection<Order> GetAssignedOrders(int userId);

        IReadOnlyCollection<Order> GetPlacedOrders(int userId);

        Order Add(Order order);

        Order Close(int orderId);
    }
}