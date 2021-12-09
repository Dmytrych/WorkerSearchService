using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WorkerSearchApp.Dto.Auth;

namespace WorkerSearchApp.Controllers
{
    [Route("[controller]")]
    public class AuthorizationApiController : Controller
    {
        private List<LoginCredentials> people = new List<LoginCredentials>
        {
            new LoginCredentials {Login="admin@gmail.com", Password="12345", Role = "a"},
            new LoginCredentials { Login="qwerty@gmail.com", Password="55555", Role = "a"}
        };
        
        [HttpPost]
        [Route("login")]
        public IActionResult Login(LoginCredentials credentials)
        {
            var identity = GetIdentity(credentials.Login, credentials.Password);
            
            if (identity == null)
            {
                return BadRequest(new { errorText = "Invalid username or password." });
            }
            
            var now = DateTime.Now;

            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
 
            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name
            };
 
            return Json(response);
        }
        
        [HttpGet]
        [Route("")]
        public IActionResult Test()
        {
            return Ok("Hello");
        }
        
        private ClaimsIdentity GetIdentity(string username, string password)
        {
            var person = people.FirstOrDefault(x => x.Login == username && x.Password == password);
            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Login),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, person.Role)
                };
                
                return new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            }

            return null;
        }
    }
}