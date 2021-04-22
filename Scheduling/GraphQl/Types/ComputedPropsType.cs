using GraphQL.Types;
using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.GraphQl.Types
{
    public class ComputedPropsType : ObjectGraphType<ComputedProps>
    {
        public ComputedPropsType()
        {
            Name = "ComputedProps";
            Field(props => props.Id).Description("Computed props id.");
            Field<ListGraphType<PermissionType>>(nameof(ComputedProps.Permissions));
            Field<ListGraphType<TeamType>>(nameof(ComputedProps.Teams));
        }
    }
}
