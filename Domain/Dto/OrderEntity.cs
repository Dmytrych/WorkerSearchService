using System.ComponentModel.DataAnnotations.Schema;

namespace WorkerSearchApp.Domain.Dto
{
    public class OrderEntity
    {
        public int Id { get; set; }

        public int OrderedById{ get; set; }

        public int TicketId { get; set; }
        
        public bool Closed { get; set; }
    }
}