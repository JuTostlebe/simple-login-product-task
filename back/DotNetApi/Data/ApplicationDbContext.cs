using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    modelBuilder.Entity<NutritionalInfo>()
        .Property(e => e.Fat).HasPrecision(5, 2);
    modelBuilder.Entity<NutritionalInfo>()
        .Property(e => e.Carbohydrates).HasPrecision(5, 2);
    modelBuilder.Entity<NutritionalInfo>()
        .Property(e => e.Protein).HasPrecision(5, 2);
    modelBuilder.Entity<NutritionalInfo>()
        .Property(e => e.Salt).HasPrecision(5, 2);
    }   
}