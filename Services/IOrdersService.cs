using System.Collections.Generic;
using WorkerSearchApp.Dto;
using WorkerSearchApp.Dto.Client;

namespace WorkerSearchApp.Services
{
    public interface IOrdersService
    {
        OrderInfoResponseDto Get(int orderId);
        
        IReadOnlyCollection<OrderInfoResponseDto> GetAssignedOrders(int userId);

        IReadOnlyCollection<OrderInfoResponseDto> GetPlacedOrders(int userId);

        OrderInfoResponseDto Add(OrderInfoResponseDto order);

        OrderInfoResponseDto Close(int orderId);
    }
}