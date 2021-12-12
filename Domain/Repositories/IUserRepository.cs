using System.Collections.Generic;
using WorkerSearchApp.Dto;

namespace WorkerSearchApp.Domain.Repositories
{
    public interface IUserRepository
    {
        IReadOnlyCollection<User> GetAllUsers();
        
        User GetUser(int id);

        User GetUser(string email, string passwordHash); 

        User AddUser(User user, string passwordHash);

        void UpdateRating(double rating, int userId);
    }
}