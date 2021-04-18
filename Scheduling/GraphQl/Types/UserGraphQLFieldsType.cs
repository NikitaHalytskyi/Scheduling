using GraphQL.Types;
using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.GraphQl.Types
{
    public class UserGraphQLFieldsType : ObjectGraphType<GraphQLFields>
    {
        public UserGraphQLFieldsType()
        {
            Name = "UserGraphQLFields";
            Field(f => f.Permissions).Description("User permissions");
            Field<ListGraphType<TeamType>>(nameof(GraphQLFields.Teams));
        }
    }
}
