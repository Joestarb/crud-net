using Microsoft.EntityFrameworkCore;
using WebApiEstudiantes.Models;

namespace WebApiEstudiantes.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {

        }

        public DbSet<Estudent> Students { get; set; }
    }
}
