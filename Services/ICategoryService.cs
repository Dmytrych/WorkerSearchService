using System.Collections.Generic;
using WorkerSearchApp.Dto;

namespace WorkerSearchApp.Services
{
    public interface ICategoryService
    {
        Category Get(int categoryId);

        IReadOnlyCollection<Category> GetAll();
    }
}