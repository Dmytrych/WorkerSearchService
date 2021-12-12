using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WorkerSearchApp.Dto;
using WorkerSearchApp.Dto.Client.Auth;
using WorkerSearchApp.Services;

namespace WorkerSearchApp.Controllers
{
    [Route("[controller]")]
    public class UserApiController : Controller
    {
        private readonly IAuthorizationService authorizationService;

        public UserApiController(IAuthorizationService authorizationService)
        {
            this.authorizationService = authorizationService;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(LoginCredentialsClientDto credentials)
        {
            var userInfo = authorizationService.Login(credentials.Login, credentials.Password);

            if (userInfo.Identity == null || userInfo.User == null)
            {
                return BadRequest(new {errorText = "Invalid username or password."});
            }

            return GetJwtResponse(userInfo.User, userInfo.Identity);
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromBody] RegisterCredentialsClientDto registerCredentials)
        {
            var userInfo =
                authorizationService.Register(ToServerDto(registerCredentials), registerCredentials?.Password);

            if (userInfo.Identity == null || userInfo.User == null)
            {
                return BadRequest(new {errorText = "Invalid input."});
            }

            return GetJwtResponse(userInfo.User, userInfo.Identity);
        }
        
        [HttpPost]
        [Route("rate")]
        public IActionResult Rate(int rating, int userId)
        {
            if (rating < 0 || rating > 5)
            {
                return BadRequest("Invalid rating value");
            }
            
            authorizationService.Rate(rating, userId);
            return Ok();
        }

        private IActionResult GetJwtResponse(User user, ClaimsIdentity identity)
        {
            var now = DateTime.Now;

            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(),
                    SecurityAlgorithms.HmacSha256));

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                accessToken = encodedJwt,
                user = user
            };

            return Json(response);
        }

        private User ToServerDto(RegisterCredentialsClientDto credentialsClientDto)
            => new User
            {
                Email = credentialsClientDto?.Email,
                Name = credentialsClientDto?.Name,
                Surname = credentialsClientDto?.Surname
            };

        [HttpGet]
        [Route("")]
        public IActionResult Test()
        {
            return Ok("Hello");
        }
    }
}