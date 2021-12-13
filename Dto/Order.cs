namespace WorkerSearchApp.Dto
{
    public class Order
    {
        public int Id { get; set; }

        public int OrderedById{ get; set; }

        public int TicketId { get; set; }
        
        public bool Closed { get; set; }
    }
}