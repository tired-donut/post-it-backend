using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Models;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Providers;

public class TokenProvider
{
    private readonly string _secret;
    
    public TokenProvider(IConfiguration configuration)
    {
        _secret = configuration["Token:Secret"]!;
    }
    
    
    public string Generate(User user)
    {
        var handler = new JwtSecurityTokenHandler();
        
        List<Claim> claims =
        [
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString())
        ];

        var descriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secret)), 
                SecurityAlgorithms.HmacSha256Signature
                )
        };
        
        var token = handler.CreateToken(descriptor);

        return handler.WriteToken(token);
    }
    
}