using System.Security.Claims;
using WorkerSearchApp.Dto;

namespace WorkerSearchApp.Services
{
    public interface IAuthorizationService
    {
        (User User, ClaimsIdentity Identity) Login(string email, string password);

        (User User, ClaimsIdentity Identity) Register(User user, string password);
    }
}