using Scheduling.Models;
using Scheduling.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Domain
{
    public partial class DataBaseRepository
    {

        readonly UserDBContext Context;

        public DataBaseRepository(UserDBContext context)
        {
            Context = context;
        }
    }
}
