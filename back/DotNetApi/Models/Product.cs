using System.Diagnostics.CodeAnalysis;
public class Product
{
    [AllowNull]
    public int Id { get; set; }
    [AllowNull]
    public string Name { get; set; }
    [AllowNull]
    public string Description { get; set; }
    [AllowNull]
    public string PackageSize { get; set; }
    [AllowNull]
    public string EanCode { get; set; }
    [AllowNull]
    public string Ingredients { get; set; }
    [AllowNull]
    public NutritionalInfo NutritionalInfo { get; set; }
    [AllowNull]
    public string DietaryInfo { get; set; }
    [AllowNull]
    public string ImageUrl { get; set; }
}

public class NutritionalInfo
{
    public int Id { get; set; }
    public int Energy { get; set; }  // kcal
    public decimal Fat { get; set; }
    public decimal Carbohydrates { get; set; }
    public decimal Protein { get; set; }
    public decimal Salt { get; set; }
}