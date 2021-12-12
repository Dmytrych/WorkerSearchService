using System.Collections.Generic;
using WorkerSearchApp.Dto;

namespace WorkerSearchApp.Domain.Repositories
{
    public interface ICategoryRepository
    {
        IReadOnlyCollection<Category> GetAll();

        Category Get(int categoryId);
    }
}