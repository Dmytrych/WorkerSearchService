using System.Collections.Generic;
using WorkerSearchApp.Dto;

namespace WorkerSearchApp.Services
{
    public interface IOrdersService
    {
        IReadOnlyCollection<Order> GetAssignedOrders(int userId);

        IReadOnlyCollection<Order> GetPlacedOrders(int userId);

        Order Add(Order order);

        Order Close(int orderId);
    }
}