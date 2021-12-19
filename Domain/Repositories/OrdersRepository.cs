using System.Collections.Generic;
using System.Linq;
using WorkerSearchApp.Domain.Dto;
using WorkerSearchApp.Dto;

namespace WorkerSearchApp.Domain.Repositories
{
    public class OrdersRepository : IOrdersRepository
    {
        private readonly IDatabaseContext dbContext;
        private readonly ITicketsRepository ticketsRepository;
        
        public OrdersRepository(IDatabaseContext dbContext, ITicketsRepository ticketsRepository)
        {
            this.dbContext = dbContext;
            this.ticketsRepository = ticketsRepository;
        }
        
        public Order Get(int orderId)
        {
            var order = dbContext.Orders.FirstOrDefault(o => o.Id == orderId);
            return order != null ? ToServerDto(order) : null;
        }
        
        public IReadOnlyCollection<Order> GetAssignedOrders(int userId)
        {
            var userOrders = dbContext.Orders.ToList().Where(o =>
            {
                var ticket = ticketsRepository.Get(o.TicketId);
                return ticket != null && ticket.OwnerId == userId;
            });

            return userOrders.Select(ToServerDto).ToList();
        }

        public IReadOnlyCollection<Order> GetPlacedOrders(int userId)
        {
            var userOrders = dbContext.Orders.ToList().Where(o => o.OrderedById == userId && !o.Closed);

            return userOrders.Select(ToServerDto).ToList();
        }
        
        public Order Add(Order order)
        {
            if (order == null)
            {
                return null;
            }
            
            var addedEntity = dbContext.Orders.Add(ToEntity(order));
            dbContext.SaveChanges();

            return addedEntity?.Entity == null ? null : ToServerDto(addedEntity.Entity);
        }
        
        public Order Close(int orderId)
        {
            var order = dbContext.Orders.FirstOrDefault(o => o.Id == orderId);

            if (order == null)
            {
                return null;
            }
            
            order.Closed = true;
            dbContext.Orders.Update(order);
            dbContext.SaveChanges();

            return ToServerDto(order);
        }

        private Order ToServerDto(OrderEntity orderEntity)
            => new Order
            {
                Id = orderEntity.Id,
                OrderedById = orderEntity.OrderedById,
                TicketId = orderEntity.TicketId,
                Closed = orderEntity.Closed,
                Name = orderEntity.Name,
                PhoneNumber = orderEntity.PhoneNumber
            };
        
        private OrderEntity ToEntity(Order order)
            => new OrderEntity
            {
                OrderedById = order.OrderedById,
                TicketId = order.TicketId,
                Closed = order.Closed,
                Name = order.Name,
                PhoneNumber = order.PhoneNumber
            };
    }
}