namespace WorkerSearchApp.Dto.Client.Auth
{
    public class RegisterCredentialsClientDto
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public string Surname { get; set; }
        
        public string Password { get; set; }

        public string Email { get; set; }
    }
}