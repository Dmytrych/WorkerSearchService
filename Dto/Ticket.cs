namespace WorkerSearchApp.Dto
{
    public class Ticket
    {
        public int Id { get; set; }

        public int OwnerId { get; set; }

        public int CategoryId { get; set; } 

        public string Description { get; set; }

        public string PhoneNumber { get; set; }
        
        public bool Closed { get; set; }
    }
}