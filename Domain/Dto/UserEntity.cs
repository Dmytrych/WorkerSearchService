namespace WorkerSearchApp.Domain.Dto
{
    public class UserEntity
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public string Surname { get; set; }
        
        public string PasswordHash { get; set; }

        public string Email { get; set; }
    }
}