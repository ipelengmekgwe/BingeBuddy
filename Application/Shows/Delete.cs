using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Shows
{
    public class Delete
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var show = await _context.Shows.FindAsync(new object[] { request.Id }, cancellationToken: cancellationToken);

                _context.Remove(show);

                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
