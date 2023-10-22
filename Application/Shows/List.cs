using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Shows
{
    public class List
    {
        public class Query : IRequest<List<Show>> { }

        public class Handler : IRequestHandler<Query, List<Show>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context) 
            {
                _context = context;
            }

            public async Task<List<Show>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Shows.ToListAsync(cancellationToken: cancellationToken);
            }
        }
    }
}
