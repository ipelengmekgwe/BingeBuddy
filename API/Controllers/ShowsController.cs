using Application.Shows;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ShowsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Show>>> GetShows(CancellationToken ct)
        {
            return await Mediator.Send(new List.Query(), ct);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Show>> GetShow(int id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateShow(Show show)
        {
            await Mediator.Send(new Create.Command { Show = show });
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditShow(int id, Show show)
        {
            show.Id = id;
            await Mediator.Send(new Edit.Command { Show = show });
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShow(int id)
        {
            await Mediator.Send(new Delete.Command {  Id = id });
            return Ok();
        }
    }
}
