using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<Product>> GetProducts()
    {
        // Hardcoded sample data
        var products = new List<Product>
        {
            new Product
            {
                Id = 1,
                Name = "Läkerol Dents Apple Fresh White",
                Description = "Läkerol Dents Apple Fresh White -ksylitolipastillissa maistuvat raikas vihreä omena ja sitruunamelissa...",
                PackageSize = "36g",
                EanCode = "6420256012512",
                Ingredients = "makeutusaineet (ksylitoli 50%, maltitolisiirappi)...",
                NutritionalInfo = new NutritionalInfo
                {
                    Energy = 268,
                    Fat = 3.9m,
                    Carbohydrates = 92m,
                    Protein = 0m,
                    Salt = 0.19m
                },
                DietaryInfo = new List<string> 
                { 
                    "Gluteeniton", 
                    "Laktoositon", 
                    "Sokeriton" 
                },
                ImageUrl = "/api/placeholder/150/150"  // Placeholder image
            },
            // Add more sample products...
        };

        return Ok(products);
    }
}