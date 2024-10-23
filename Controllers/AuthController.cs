using System.Security.Cryptography;
using Backend.Contexts;
using Backend.Dto;
using Backend.Models;
using Backend.Providers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly DatasourceContext _context;

    private readonly TokenProvider _tokenProvider;
    private readonly EncryptProvider _encryptProvider;
    
    public AuthController(
        DatasourceContext context, 
        TokenProvider tokenProvider, 
        EncryptProvider encryptProvider
        )
    {
        _context = context;
        _tokenProvider = tokenProvider;
        _encryptProvider = encryptProvider;
    }

    [HttpPost("sign-up", Name = "SignUp")]
    public async Task<IActionResult> SignUp(SignUpRequestDto data)
    {
        if (await _context.Users.AnyAsync(u => u.Email == data.Email))
        {
            return Conflict("Credentials already exists");
        }

        if (await _context.Users.AnyAsync(u => u.Username == data.Username))
        {
            return Conflict("Credentials already exists");
        }

        var result = await _context.Users.AddAsync(new User()
        {
            Name = data.Name,
            Email = data.Email,
            Username = data.Username,
            Password = _encryptProvider.Hash(data.Password)
        });

        await _context.SaveChangesAsync();

        var user = result.Entity;

        return Ok(new UserResponseDto()
            {
                Id = user.Id,
                Name = user.Name,
                UserName = user.Username,
                Email = user.Email,
            }
        );
    }

    [HttpPost("sign-in", Name = "SignIn")]
    public async Task<IActionResult> SignIn(SignInRequestDto data)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == data.Username);

        if (user == null)
        {
            return Unauthorized("Bad credentials");
        }

        if (!_encryptProvider.Verify(data.Password, user.Password))
        {
            return Unauthorized("Bad credentials");
        }


        var access = _tokenProvider.Generate(user);

        return Ok(new TokenResponseDto()
            {
                Type = "Bearer",
                Access = access,
            }
        );
    }
}