using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Shows
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Show Show {  get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var show = await _context.Shows.FindAsync(new object[] { request.Show.Id }, cancellationToken: cancellationToken);
                _mapper.Map(request.Show, show);

                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
