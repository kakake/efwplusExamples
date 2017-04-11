define(['jquery', 'common', "handlebars.min", "text!../../handlebars/mnodeplugin.html", "jquery.json", "amazeui.tree.min"], function ($, common, Handlebars, html_template) {


    function query(menuId, templates) {
        var identify = $('#mnodelist').val();
        common.simpleAjax("Monitor/GetMNodePService", { identify: identify }, function (data) {
            //$('#firstTree').tree('closeAll');
            $('#firstTree').tree({
                dataSource: function (options, callback) {
                    // 模拟异步加载
                    setTimeout(function () {
                        callback({ data: options.childs || data });
                    }, 40);
                },
                multiSelect: false,
                cacheItems: true,
                folderSelect: true
            });
        });
    }

    function addlocal(menuId, templates) {
        var tooltip = $('#vld-tooltip').hide();
        $('#addlocalplugin_modal').modal({
            relatedTarget: this,
            closeOnConfirm: false,
            //closeViaDimmer:false,
            //dimmer:false,
            onConfirm: function (e) {
                tooltip.hide();
                var selectdata = $('#txt_localplugin').val();
                if (selectdata == null) {
                    tooltip.text("请先选择一个插件！").show();
                    return;
                }

                var identify = $('#mnodelist').val();

                common.simpleAjax("Monitor/AddMNodePService", { identify: identify, type: 0, data: $.toJSON(selectdata) }, function (flag) {
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

    function addremote(menuId, templates) {
        var tooltip = $('#vld-tooltip2').hide();
        $('#addremoteplugin_modal').modal({
            relatedTarget: this,
            closeOnConfirm: false,
            //closeViaDimmer:false,
            //dimmer:false,
            onConfirm: function (e) {
                tooltip.hide();
                var selectplugin = $('#txt_remoteplugin').val();
                if (selectplugin == null) {
                    tooltip.text("请先选择一个插件！").show();
                    return;
                }
                var selectnode = $('#txt_remotemnode').val();
                if (selectnode == null) {
                    tooltip.text("请先选择一个节点！").show();
                    return;
                }
                var data = { pluginname: selectplugin, mnodeidentify: selectnode };
                var identify = $('#mnodelist').val();
                common.simpleAjax("Monitor/AddMNodePService", { identify: identify, type: 1, data: $.toJSON(data) }, function (flag) {
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

    function delplugin(menuId, templates) {
        if ($('body').data('type')) {
            var result = confirm('是否此节点的插件？');
            if (result) {
                var identify = $('body').data('mnodelist');
                var type = 0;
                if ($('body').data('type') == 'remoteplugin')
                    type = 1;
                var pluginname = $('body').data('value');
                common.simpleAjax("Monitor/DelMNodePService", { identify: identify, type: type, pluginname: pluginname }, function (flag) {
                    if (flag) {
                        showpage(menuId, templates);
                    }
                });
            }
        }
    }

    //显示界面
    function showpage(menuId, templates, url) {

        common.simpleAjax(url || "Monitor/GetMNodePluginViewData?identify=0", {}, function (data) {
            var data={ data: common.toJson(data) };
            common.loadtemplate(menuId, templates, html_template, data);
            $('#txt_localplugin').selected();
            $('#txt_remoteplugin').selected();
            $('#txt_remotemnode').selected();

            if ($('body').data('mnodelist')) {
                $('#mnodelist').val($('body').data('mnodelist'));
            }
            $('#mnodelist').selected();

            $('#firstTree').tree({
                dataSource: function (options, callback) {
                    // 模拟异步加载
                    setTimeout(function () {
                        callback({ data: options.childs || data.data.tree });
                    }, 40);
                },
                multiSelect: false,
                cacheItems: true,
                folderSelect: true
            }).on('selected.tree.amui', function (e, selected) {
                //console.log('Select Event: ', selected);
                //console.log($('#firstTree').tree('selectedItems'));
                if (selected.target.attr) {
                    $('body').data('type', selected.target.attr.type);
                    $('body').data('value', selected.target.attr.value);
                } else {
                    $('body').data('type', null);
                    $('body').data('value', null);
                }
            });

            $('#btn_query').click(function () {
                $('body').data('mnodelist', $('#mnodelist').val());
                //query(menuId, urls, templates);
                url = "Monitor/GetMNodePluginViewData?identify=" + $('#mnodelist').val();
                showpage(menuId, templates, url);
            });

            $('#btn_plugin_addlocal').click(function () {
                addlocal(menuId, templates);
            });

            $('#btn_plugin_addremote').click(function () {
                addremote(menuId, templates);
            });

            $('#btn_plugin_del').click(function () {
                delplugin(menuId, templates);
            });
        });
    }

    return {
        showpage: showpage
    };
});