using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Contexts;

public class DatasourceContext(DbContextOptions<DatasourceContext> options): DbContext(options)
{
    public DbSet<User> Users { get; set; }
}