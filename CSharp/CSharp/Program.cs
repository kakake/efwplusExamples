using EFWCoreLib.WcfFrame;
using EFWCoreLib.WcfFrame.DataSerialize;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;

namespace CSharp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("服务名：Books.Service");
            Console.WriteLine("控制器：Books.Service");
            Console.WriteLine("方法：GetBooks");

            Console.WriteLine("1.使用ClientLink访问efwplus中间件服务：");
            //使用ClientLink方式
            CallService();
            //Console.ReadLine();

            Console.WriteLine("2.使用Http API访问efwplus中间件服务：");
            for (int i = 0; i < 100; i++)
                //使用API方式
                CallAPI();
            Console.ReadLine();
        }


        static void CallService()
        {
            
            ClientLink clientlink = new ClientLink("Books.Service");
            clientlink.CreateConnection();

            Action<ClientRequestData> _requestAction = ((ClientRequestData request) =>
            {
                request.LoginRight = new EFWCoreLib.CoreFrame.Business.SysLoginRight(1);
            });

            ServiceResponseData retData = clientlink.Request("bookWcfController", "GetBooks", _requestAction);
            string data = retData.GetJsonData();
            clientlink.UnConnection();

            Console.WriteLine(data);
        }

        static void CallAPI()
        {
            Uri address = new Uri("http://36.111.200.233:7711/HttpService/");
            string args = "{\"sysright\": {\"token\": \"\"},\"plugin\": \"Books.Service\",\"controller\": \"bookWcfController\",\"method\": \"GetBooks\"}";
            // Create the web request
            HttpWebRequest request = WebRequest.Create(address) as HttpWebRequest;

            // Set type to POST
            request.Method = "POST";
            request.ContentType = "application/json; charset=utf-8";
            // Create a byte array of the data we want to send
            byte[] byteData = UTF8Encoding.UTF8.GetBytes(args);

            // Set the content length in the request headers
            request.ContentLength = byteData.Length;

            // Write data
            using (Stream postStream = request.GetRequestStream())
            {
                postStream.Write(byteData, 0, byteData.Length);
                postStream.Flush();
            }

            string data;
            // Get response
            using (HttpWebResponse response = request.GetResponse() as HttpWebResponse)
            {
                // Get the response stream
                StreamReader reader = new StreamReader(response.GetResponseStream());

                // Console application output
                data = reader.ReadToEnd();
            }

            Console.WriteLine(data);
        }
    }
}
