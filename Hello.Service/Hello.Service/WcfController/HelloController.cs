using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EFWCoreLib.CoreFrame.Business.AttributeInfo;
using EFWCoreLib.WcfFrame.DataSerialize;
using EFWCoreLib.WcfFrame.ServerController;

namespace Hello.Service.WcfController
{
    [WCFController]
    public class HelloController : WcfServerController
    {
        [WCFMethod]
        public ServiceResponseData Hello()
        {
            responseData.AddData("hello world!");
            return responseData;
        }
    }
}
