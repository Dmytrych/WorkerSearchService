using System.Collections.Generic;
using System.Linq;
using WorkerSearchApp.Domain.Dto;
using WorkerSearchApp.Dto;

namespace WorkerSearchApp.Domain.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly IDatabaseContext dbContext;
        
        public CategoryRepository(IDatabaseContext dbContext)
        {
            this.dbContext = dbContext;
        }
        
        public IReadOnlyCollection<Category> GetAll()
            => dbContext.Categories.Select(ToServerDto).ToList();

        public Category Get(int categoryId)
            => ToServerDto(dbContext.Categories.FirstOrDefault(c => c.Id == categoryId));

        private Category ToServerDto(CategoryEntity categoryEntity)
            => new Category
            {
                Id = categoryEntity.Id,
                Name = categoryEntity.Name
            };
        
        private CategoryEntity ToEntity(Category categoryEntity)
            => new CategoryEntity
            {
                Name = categoryEntity.Name
            };
    }
}