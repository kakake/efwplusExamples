define(['jquery', 'jquery.upload', 'common', "handlebars.min", "text!../../handlebars/pluginlist.html", "jquery.json"], function ($, upload, common, Handlebars, html_template) {

    //保存插件
    function saveplugin(menuId, templates, formdata) {
        var tooltip = $('#vld-tooltip').hide();
        if (formdata) {
            $('#txt_pluginname').val(formdata.pluginname);
            $('#txt_title').val(formdata.title);
            $('#txt_versions').val(formdata.versions);
            $('#txt_author').val(formdata.author);
            $('#txt_introduce').val(formdata.introduce);
        } else {
            $('#txt_pluginname').val("");
            $('#txt_title').val("");
            $('#txt_versions').val("");
            $('#txt_author').val("");
            $('#txt_introduce').val("");
            formdata = {
                pluginname: '',
                title: '',
                versions: '',
                author: '',
                introduce:''
            };
        }

        $('#plugin_modal').modal({
            relatedTarget: this,
            closeOnConfirm: false,
            //closeViaDimmer:false,
            //dimmer:false,
            onConfirm: function (e) {
                tooltip.hide();
                if ($('#txt_pluginname').val() == "") {
                    tooltip.text("插件名不能为空！").show();
                    return;
                }
                if ($('#txt_title').val() == "") {
                    tooltip.text("名称不能为空！").show();
                    return;
                }
                if ($('#txt_versions').val() == "") {
                    tooltip.text("版本不能为空！").show();
                    return;
                }
                if ($('#txt_author').val() == "") {
                    tooltip.text("作者不能为空！").show();
                    return;
                }
                formdata.pluginname = $('#txt_pluginname').val();
                formdata.title = $('#txt_title').val();
                formdata.versions = $('#txt_versions').val();
                formdata.author = $('#txt_author').val();
                formdata.introduce = $('#txt_introduce').val();
                common.simpleAjax("Monitor/SavePlugin", { para: $.toJSON(formdata) }, function (flag) {
                    if (flag) {
                        //$(this).modal('toggle');
                        $(this).modal('close');
                        $('.am-dimmer').hide();
                        showpage(menuId, templates);
                    }
                });
            }
        });
    }

    //显示中间件节点
    function showpage(menuId, templates) {
        Handlebars.registerHelper("todelflag", function (value) {
            if (value == "0") {
                return "正常";
            } else {
                return "停用";
            }
        });
        Handlebars.registerHelper("tojson", function (value) {
            return $.toJSON(value);
        });

        common.simpleAjax("Monitor/GetPluginList", {}, function (data) {

            common.loadtemplate(menuId, templates, html_template, { data: common.toJson(data) });

            $('#btn_plugin_ref').click(function () {
                showpage(menuId, templates);
            });

            $('#btn_plugin_add').click(function () {
                saveplugin(menuId, templates);
            });

            $('#btn_plugin_edit').click(function () {
                var value = $('#content_body table tbody tr.am-active').attr("value");
                value = $.evalJSON(value);
                saveplugin(menuId, templates, value);
            });

            $('#btn_plugin_upload').click(function () {
                var value = $('#content_body table tbody tr.am-active').attr("value");
                value = $.evalJSON(value);
                upload('Upgrade/Upload?name=PluginUpgrade\\' + value.pluginname + '.zip');
            });
            

            $('#btn_plugin_stop').click(function () {
                var value = $('#content_body table tbody tr.am-active').attr("value");
                value = $.evalJSON(value);
                if (value.id_string) {
                    var result = confirm('是否停用此插件服务？');
                    if (result) {
                        common.simpleAjax("Monitor/OnOffPlugin", { id: value.id_string }, function (flag) {
                            if (flag) {
                                showpage(menuId, templates);
                            }
                        });
                    }
                }
            });

            $('#content_body table tbody tr').click(function () {
                $('#content_body table tbody tr').removeClass("am-active");
                $(this).addClass("am-active");
                var value = $('#content_body table tbody tr.am-active').attr("value");
                value = $.evalJSON(value);
                if (value.delflag == "1") {
                    $('#btn_plugin_stop').html("<span class='am-icon-twitch'></span> 启用");
                } else {
                    $('#btn_plugin_stop').html("<span class='am-icon-remove'></span> 停用");
                }
            });
        });
    }

    function upload(url, callback) {
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