using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

[Table("users")]
[Index(nameof(Username), IsUnique = true)]
[Index(nameof(Email), IsUnique = true)]
public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("name")]
    [Required]
    public string Name { get; set; }

    [Column("username")]
    [Required]
    public string Username { get; set; }
    
    [Column("email")]
    [Required]
    public string Email { get; set; }
    
    [Column("password")]
    [Required]
    public string Password { get; set; }
}