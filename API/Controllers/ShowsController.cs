using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ShowsController : BaseApiController
    {
        private readonly DataContext _context;

        public ShowsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Show>>> GetShows()
        {
            return await _context.Shows.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Show>> GetShow(int id)
        {
            return await _context.Shows.FindAsync(id);
        }
    }
}
