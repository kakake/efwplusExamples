using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using EFWCoreLib.WcfFrame.DataSerialize;
using efwplusWebApi.App_Start;

namespace Hello.Web.Controllers
{
    public class Hello2Controller :  EApiController
    {
        [HttpGet]
        public object GetHello()
        {
            ServiceResponseData retdata = InvokeWcfService("Hello.Service", "HelloController", "Hello");
            return retdata.GetData<string>(0);
        }
    }
}
