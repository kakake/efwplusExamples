using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Hello.Web.Controllers
{
    public class Hello2Controller : ApiController
    {
        [HttpGet]
        public object GetHello()
        {
            return "Hello World";
        }
    }
}
