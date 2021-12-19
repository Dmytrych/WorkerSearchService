using System.Collections.Generic;
using System.Linq;
using WorkerSearchApp.Domain.Repositories;
using WorkerSearchApp.Dto;
using WorkerSearchApp.Dto.Client;

namespace WorkerSearchApp.Services
{
    public class OrdersService : IOrdersService
    {
        private IOrdersRepository ordersRepository;
        
        public OrdersService(IOrdersRepository ordersRepository)
        {
            this.ordersRepository = ordersRepository;
        }

        public OrderInfoResponseDto Get(int orderId)
        {
            var order = ordersRepository.Get(orderId);
            return order != null ? ToClientDto(order) : null;
        }

        public IReadOnlyCollection<OrderInfoResponseDto> GetAssignedOrders(int userId)
            => ordersRepository.GetAssignedOrders(userId).Select(ToClientDto).ToList();

        public IReadOnlyCollection<OrderInfoResponseDto> GetPlacedOrders(int userId)
            => ordersRepository.GetPlacedOrders(userId).Select(ToClientDto).ToList();

        public OrderInfoResponseDto Add(OrderInfoResponseDto order)
            => ToClientDto(ordersRepository.Add(ToServerDto(order)));

        public OrderInfoResponseDto Close(int orderId)
            => ToClientDto(ordersRepository.Close(orderId));

        private OrderInfoResponseDto ToClientDto(Order order)
            => new OrderInfoResponseDto
            {
                Id = order.Id,
                IsClosed = order.Closed,
                Name = order.Name,
                OrderedById = order.OrderedById,
                PhoneNumber = order.PhoneNumber,
                TicketId = order.TicketId
            };
        
        private Order ToServerDto(OrderInfoResponseDto order)
            => new Order
            {
                Id = order.Id,
                Closed = order.IsClosed,
                Name = order.Name,
                OrderedById = order.OrderedById,
                PhoneNumber = order.PhoneNumber,
                TicketId = order.TicketId
            };
    }
}