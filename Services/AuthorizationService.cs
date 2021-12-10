using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
            var user = userRepository.GetUser(email, password.GetHashCode().ToString());
            return user == null ? (null, null) : (user, GetIdentity(user));
        }

        public (User User, ClaimsIdentity Identity) Register(User user, string password)
        {
            if (!IsUserValid(user, password) || userRepository.GetAllUsers().FirstOrDefault(u => u.Email == user.Email) != null)
            {
                return (null, null);
            }

            var registeredUser = userRepository.AddUser(user, password.GetHashCode().ToString());
            return user == null ? (null, null) : (registeredUser, GetIdentity(registeredUser));
        }

        private bool IsUserValid(User user, string password)
            => !IsNullOrEmptyOrWhitespace(user.Name)
               && !IsNullOrEmptyOrWhitespace(user.Email)
               && !IsNullOrEmptyOrWhitespace(password)
               && !IsNullOrEmptyOrWhitespace(user.Surname);

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
    }
}