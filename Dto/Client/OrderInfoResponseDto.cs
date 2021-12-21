namespace WorkerSearchApp.Dto.Client
{
    public class OrderInfoResponseDto
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public int OrderedById { get; set; }
        
        public User OrderedBy { get; set; }
        
        public int TicketId { get; set; }
        
        public string PhoneNumber { get; set; }
        
        public bool IsClosed { get; set; }
    }
}