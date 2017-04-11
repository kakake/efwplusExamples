define(['jquery', 'jquery.upload', 'common', "handlebars.min", "text!../../handlebars/upgrade.html"], function ($,upload, common, Handlebars, html_template) {

    //
    function showpage(menuId, templates) {

        common.simpleAjax("Upgrade/GetFiles", {}, function (data) {
            common.loadtemplate(menuId, templates, html_template, { data: common.toJson(data) });
            //中间件升级包
            $('#mnode_uploadxml').click(function () {
                upload('Upgrade/Upload?name=MNodeUpgrade\\update.xml', function () {
                    showpage(menuId, templates);
                });
            });
            $('#mnode_uploadzip').click(function () {
                upload('Upgrade/Upload?name=MNodeUpgrade\\update.zip', function () {
                    showpage(menuId, templates);
                });
            });
            //Web程序升级包
            $('#web_uploadxml').click(function () {
                upload('Upgrade/Upload?name=WebUpgrade\\update.xml', function () {
                    showpage(menuId, templates);
                });
            });
            $('#web_uploadzip').click(function () {
                upload('Upgrade/Upload?name=WebUpgrade\\update.zip', function () {
                    showpage(menuId, templates);
                });
            });
            //桌面程序升级包
            $('#win_uploadxml').click(function () {
                upload('Upgrade/Upload?name=ClientUpgrade\\update.xml', function () {
                    showpage(menuId, templates);
                });
            });
            $('#win_uploadzip').click(function () {
                upload('Upgrade/Upload?name=ClientUpgrade\\update.zip', function () {
                    showpage(menuId, templates);
                });
            });

            //查看和删除
            $('.lookfile').attr("href",function () {
                //common.simpleAjax("Upgrade/Download", { name: $(this).attr("value") });
                return common.postUrl("Upgrade/Download?name=" + $(this).attr("value"));
            });
            $('.deletefile').click(function () {
                common.simpleAjax("Upgrade/DeleteFile", { name: $(this).attr("value") }, function () {
                    showpage(menuId, templates);
                });
            });
        });
    }

    function upload(url,callback) {
        // 上传方法
        $.upload({
            // 上传地址
            url: common.postUrl(url),
            // 文件域名字
            fileName: 'filedata',
            // 其他表单数据
            //params: { upgradename: 'MNodeUpgrade/update.xml' },
            // 上传完成后, 返回json, text
            dataType: 'json',
            // 上传之前回调,return true表示可继续上传
            onSend: function () {
                return true;
            },
            // 上传之后回调
            onComplate: function () {
                //alert("upload done");
                callback();
            }
        });
    }

    return {
        showpage: showpage
    };
});