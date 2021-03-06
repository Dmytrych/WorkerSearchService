using System.ComponentModel.DataAnnotations.Schema;

namespace WorkerSearchApp.Domain.Dto
{
    public class TicketEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }
        
        public int Price { get; set; }
        
        public int OwnerId { get; set; }

        public int CategoryId { get; set; }

        public string Description { get; set; }

        public string PhoneNumber { get; set; }
        
        public bool Closed { get; set; }
    }
}