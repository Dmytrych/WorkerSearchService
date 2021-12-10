using System.Collections.Generic;
using WorkerSearchApp.Dto;

namespace WorkerSearchApp.Domain.Repositories
{
    public interface IUserRepository
    {
        public IReadOnlyCollection<User> GetAllUsers();
        
        public User GetUser(int id);

        public User GetUser(string email, string passwordHash); 

        public User AddUser(User user, string passwordHash);
    }
}