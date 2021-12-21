using System.Collections.Generic;
using System.Linq;
using WorkerSearchApp.Domain.Dto;
using WorkerSearchApp.Dto;

namespace WorkerSearchApp.Domain.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IDatabaseContext databaseContext;
        
        public UserRepository(IDatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }

        public IReadOnlyCollection<User> GetAllUsers()
            => databaseContext.Users.Select(ToServerDto).ToList();

        public User GetUser(int id)
        {
            var user = databaseContext.Users.FirstOrDefault(u => u.Id == id);
            return user != null ? ToServerDto(user) : null;
        }

        public User GetUser(string email, string passwordHash)
        {
            var user = databaseContext.Users.FirstOrDefault(u => u.PasswordHash == passwordHash && u.Email == email);
            return user != null ? ToServerDto(user) : null;
        }

        public User AddUser(User user, string passwordHash)
        {
            var entity = ToEntity(user, passwordHash);

            var result = databaseContext.Users.Add(entity);
            databaseContext.SaveChanges();

            return result != null ? ToServerDto(result.Entity) : null;
        }

        public void UpdateRating(double rating, int userId)
        {
            var user = databaseContext.Users.FirstOrDefault(u => u.Id == userId);

            if (user == null)
            {
                return;
            }

            user.Rated++;
            user.Rating = rating;
            databaseContext.Users.Update(user);
            databaseContext.SaveChanges();
        }

        private User ToServerDto(UserEntity user)
            => new User()
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Surname = user.Surname,
                Rating = user.Rating,
                Rated = user.Rated,
                PhoneNumber = user.PhoneNumber
            };

        private UserEntity ToEntity(User user, string password)
            => new UserEntity()
            {
                Email = user.Email,
                Name = user.Name,
                PasswordHash = password,
                Surname = user.Surname,
                Rating = user.Rating,
                Rated = user.Rated,
                PhoneNumber = user.PhoneNumber
            };
    }
}