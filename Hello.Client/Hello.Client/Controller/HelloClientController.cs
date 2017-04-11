using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using EFWCoreLib.CoreFrame.Business.AttributeInfo;
using EFWCoreLib.WcfFrame.ClientController;
using EFWCoreLib.WcfFrame.DataSerialize;
using Hello.Client.IView;

namespace Hello.Client.Controller
{
    [WinformController(DefaultViewName = "frmHello")]//在菜单上显示
    [WinformView(Name = "frmHello",ViewTypeName = "Hello.Client.ViewForm.frmHello")]//控制器关联的界面
    public class HelloClientController : WcfClientController
    {
        IfrmHello _ifrmHello;
        public override void Init()
        {
            _ifrmHello = (IfrmHello)DefaultView;
        }

        [WinformMethod]
        public string GetHello()
        {
            //通过wcf服务调用bookWcfController控制器中的GetBooks方法
            ServiceResponseData retdata = InvokeWcfService("Hello.Service", "HelloController", "Hello");
            return retdata.GetData<string>(0);
        }
    }
}
