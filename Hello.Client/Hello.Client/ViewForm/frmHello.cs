using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using EFWCoreLib.CoreFrame.Business;
using Hello.Client.IView;

namespace Hello.Client.ViewForm
{
    public partial class frmHello : BaseFormBusiness, IfrmHello
    {
        public frmHello()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            MessageBox.Show(InvokeController("GetHello").ToString());
        }
    }
}
