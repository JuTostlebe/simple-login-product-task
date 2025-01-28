// Product.cs
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string PackageSize { get; set; }
    public string EanCode { get; set; }
    public string Ingredients { get; set; }
    public NutritionalInfo NutritionalInfo { get; set; }
    public List<string> DietaryInfo { get; set; }
    public string ImageUrl { get; set; }
}

public class NutritionalInfo
{
    public int Energy { get; set; }  // kcal
    public decimal Fat { get; set; }
    public decimal Carbohydrates { get; set; }
    public decimal Protein { get; set; }
    public decimal Salt { get; set; }
}