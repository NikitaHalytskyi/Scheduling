using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;
using Scheduling.GraphQl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.GraphQl.Schemas
{
    public class LoginSchema : Schema
    {
        public LoginSchema(IServiceProvider provider) : base(provider)
        {
            Query = provider.GetRequiredService<Querys>();
            Mutation = provider.GetRequiredService<Mutations>();
        }
    }
}
