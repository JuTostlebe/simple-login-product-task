using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[controller]")]
public class SearchController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SearchController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("{ean}")]
    public async Task<ActionResult<Product>> GetProductByEan(string ean)
    {
        var product = await _context.Products
            .Include(p => p.NutritionalInfo)
            .FirstOrDefaultAsync(p => p.EanCode == ean);

        if (product == null)
            return NotFound();

        return product;
    }
}