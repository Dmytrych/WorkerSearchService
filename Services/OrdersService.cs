using System.Collections.Generic;
using WorkerSearchApp.Domain.Repositories;
using WorkerSearchApp.Dto;

namespace WorkerSearchApp.Services
{
    public class OrdersService : IOrdersService
    {
        private IOrdersRepository ordersRepository;
        
        public OrdersService(IOrdersRepository ordersRepository)
        {
            this.ordersRepository = ordersRepository;
        }

        public IReadOnlyCollection<Order> GetAssignedOrders(int userId)
            => ordersRepository.GetAssignedOrders(userId);

        public IReadOnlyCollection<Order> GetPlacedOrders(int userId)
            => ordersRepository.GetPlacedOrders(userId);

        public Order Add(Order order)
            => ordersRepository.Add(order);

        public Order Close(int orderId)
            => ordersRepository.Close(orderId);
    }
}