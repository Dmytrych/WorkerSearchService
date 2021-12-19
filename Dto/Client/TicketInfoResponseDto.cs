namespace WorkerSearchApp.Dto.Client
{
    public class TicketInfoResponseDto
    {
        public int Id { get; set; }

        public string Name { get; set; }
        
        public int Price { get; set; }

        public Category Category { get; set; }
        
        public string Description { get; set; }

        public string PhoneNumber { get; set; }
        
        public User Owner { get; set; }
        
        public bool IsClosed { get; set; }
    }
}