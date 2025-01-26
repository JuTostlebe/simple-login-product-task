using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Hello from .NET!");
    }
}