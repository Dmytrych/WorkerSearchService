using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WorkerSearchApp.Services;

namespace WorkerSearchApp.Controllers
{
    [EnableCors("AllowAll")]
    [Route("[controller]")]
    public class CategoryApiController : Controller
    {
        private readonly ICategoryService categoryService;
        
        public CategoryApiController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }
        
        [HttpGet("{categoryId}")]
        [Route("get")]
        public IActionResult Get([FromRoute] int categoryId)
        {
            var category = categoryService.Get(categoryId);
            return category != null ? Ok(category) : BadRequest("Category does not exist");
        }
        
        [HttpGet]
        [Route("get-all")]
        public IActionResult GetAll()
        {
            return Ok(categoryService.GetAll());
        }
    }
}