using System.Collections.Generic;
using WorkerSearchApp.Dto;

namespace WorkerSearchApp.Services
{
    public interface ICategoryService
    {
        IReadOnlyCollection<Category> GetAll();
    }
}