using GraphQL.Types;
using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.GraphQl.Types
{
    public class LoginType : ObjectGraphType<Login>
    {
        public LoginType()
        {

            Name = "Token";
            Description = "JWT";

            Field(l => l.Token).Description("JWT. Returned if valid login and valid password .");

        }
    }
}
