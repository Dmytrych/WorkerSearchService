using Microsoft.AspNetCore.Mvc;
using WorkerSearchApp.Services;

namespace WorkerSearchApp.Controllers
{
    [Route("[controller]")]
    public class CategoryApiController : Controller
    {
        private readonly ICategoryService categoryService;
        
        public CategoryApiController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }
        
        [HttpGet]
        [Route("get-all")]
        public IActionResult GetAll()
        {
            return Ok(categoryService.GetAll());
        }
    }
}