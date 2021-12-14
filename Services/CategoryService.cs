using System.Collections.Generic;
using WorkerSearchApp.Domain.Repositories;
using WorkerSearchApp.Dto;

namespace WorkerSearchApp.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository categoryRepository;
        
        public CategoryService(ICategoryRepository categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }
        
        public IReadOnlyCollection<Category> GetAll()
        {
            var categories = categoryRepository.GetAll();
            return categories ?? new List<Category>();
        }
    }
}