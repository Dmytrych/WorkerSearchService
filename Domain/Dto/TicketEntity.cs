using System.ComponentModel.DataAnnotations.Schema;

namespace WorkerSearchApp.Domain.Dto
{
    public class TicketEntity
    {
        public int Id { get; set; }

        public int OwnerId { get; set; }

        public int WorkTypeId { get; set; }

        [ForeignKey("WorkTypeId")]
        public WorkTypeEntity WorkType { get; set; }

        public string Description { get; set; }

        public string PhoneNumber { get; set; }
    }
}