define(['jquery', 'common', "handlebars.min", "text!../../handlebars/register.html"], function ($, common, Handlebars, html_template) {


    //显示中间件节点
    function show_page(menuId, templates) {
        $('#errorinfo').hide();
        common.simpleAjax("mnodeconfig/GetMachineCode", {}, function (data) {

            common.loadtemplate(menuId, templates, html_template, { data: common.toJson(data) });

            $('#txt_machinecode').val(data);
            $('#btn_activate').click(function () {
                common.simpleAjax("mnodeconfig/ActivateRegCode", { regcode: $('#txt_regcode').val() }, function (flag) {
                    if (flag) {
                        //alert("激活成功！");
                        $('#errorinfo').text('激活成功！');
                    } else {
                        //alert("激活失败！");
                        $('#errorinfo').text('激活失败！');
                    }

                    $('#errorinfo').show();
                    $('#errorinfo').addClass("am-alert");
                    $('#errorinfo').addClass("am-alert-danger");
                });
            });
        });
    }

    return {
        showpage: show_page
    };
});