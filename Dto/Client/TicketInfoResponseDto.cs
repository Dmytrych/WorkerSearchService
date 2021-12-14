namespace WorkerSearchApp.Dto.Client
{
    public class TicketInfoResponseDto
    {
        public int Id { get; set; }

        public User Owner { get; set; }

        public Category Category { get; set; }

        public string Description { get; set; }

        public string PhoneNumber { get; set; }
        
        public bool Closed { get; set; }
    }
}