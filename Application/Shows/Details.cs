using Domain;
using MediatR;
using Persistence;

namespace Application.Shows
{
    public class Details
    {
        public class Query : IRequest<Show>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Show>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Show> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Shows.FindAsync(new object[] { request.Id }, cancellationToken: cancellationToken);
            }
        }
    }
}
