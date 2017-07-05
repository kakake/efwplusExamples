using EFWCoreLib.WcfFrame;
using EFWCoreLib.WcfFrame.DataSerialize;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CSharp
{
    class Program
    {
        static void Main(string[] args)
        {

            ClientLink clientlink = new ClientLink("Books.Service");
            clientlink.CreateConnection();

            Action<ClientRequestData> _requestAction = ((ClientRequestData request) =>
            {
                request.LoginRight = new EFWCoreLib.CoreFrame.Business.SysLoginRight(1);
            });

            ServiceResponseData retData = clientlink.Request("bookWcfController", "GetBooks", _requestAction);
            string data = retData.GetJsonData();

            Console.WriteLine(data);
            Console.ReadLine();
        }
    }
}
