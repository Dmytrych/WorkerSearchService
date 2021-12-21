using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using WorkerSearchApp.Domain.Repositories;
using WorkerSearchApp.Dto;

namespace WorkerSearchApp.Services
{
    public class AuthorizationService : IAuthorizationService
    {
        private readonly IUserRepository userRepository;
        
        public AuthorizationService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        
        public (User User, ClaimsIdentity Identity) Login(string email, string password)
        {
            var user = userRepository.GetUser(email, GetHash(password));
            return user == null ? (null, null) : (user, GetIdentity(user));
        }

        public (User User, ClaimsIdentity Identity) Register(User user, string password)
        {
            if (!IsUserValid(user, password) || userRepository.GetAllUsers().Any(u => u.Email == user.Email))
            {
                return (null, null);
            }

            user.Rating = 5.0;

            var registeredUser = userRepository.AddUser(user, GetHash(password));
            return user == null ? (null, null) : (registeredUser, GetIdentity(registeredUser));
        }

        public void Rate(int rating, int userId)
        {
            var user = userRepository.GetUser(userId);

            if (user == null)
            {
                return;
            }
            
            userRepository.UpdateRating(RecalculateRating(rating, user), userId);
        }
        
        public User Get(int userId)
            => userRepository.GetUser(userId);

        private double RecalculateRating(int rating, User user)
            => (user.Rating * user.Rated + rating) / (user.Rated + 1);

        private bool IsUserValid(User user, string password)
            => !IsNullOrEmptyOrWhitespace(user.Name)
               && !IsNullOrEmptyOrWhitespace(user.Email)
               && !IsNullOrEmptyOrWhitespace(password);

        private bool IsNullOrEmptyOrWhitespace(string value)
            => string.IsNullOrEmpty(value) || string.IsNullOrWhiteSpace(value);
        
        private ClaimsIdentity GetIdentity(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email)
            };
                
            return new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
        }

        private string GetHash(string str)
            => System.Text.Encoding.Default.GetString(MD5.HashData(System.Text.Encoding.Default.GetBytes(str)));
    }
}