define(['jquery', 'common', "handlebars.min", "text!../../handlebars/mnodestate.html", "amazeui.tree.min"], function ($, common, Handlebars, html_template) {

    //获取远程日志
    function getremotelog() {
        $('#logdate').datepicker('setValue', new Date());
        $('#logtype').selected();
        $('#logtext').html("");
        $('#modal_remotelog').modal('open');
        $('#btn_logsearch').unbind('click').click(function () {
            var identify = $('body').data('identify');
            var url = "Monitor/GetRemoteNodeLog";
            var para = { identify: identify, logtype: $('#logtype').val(), date: $('#logdate').data('date') };
            if (identify) {
                common.simpleAjax(url, para, function (data) {
                    $('#logtext').html(data);
                });
            }
        });
    }
    //获取远程命令
    function getremotecmd() {
        $('#modal_remotecmd').modal('open');

        $('#btn_restart').unbind('click').click(function () {
            var result = confirm('是否执行此操作？');
            if (result) {
                common.simpleAjax("Monitor/ExecuteRemoteCmd", { identify: $('body').data('identify'), eprocess: "efwplusserver", method: "quitall", arg: "" });
            }
        });

        $('#btn_restartbase').unbind('click').click(function () {
            var result = confirm('是否执行此操作？');
            if (result) {
                common.simpleAjax("Monitor/ExecuteRemoteCmd", { identify: $('body').data('identify'), eprocess: "efwplusserver", method: "restartbase", arg: "" });
            }
        });

        $('#btn_restartroute').unbind('click').click(function () {
            var result = confirm('是否执行此操作？');
            if (result) {
                common.simpleAjax("Monitor/ExecuteRemoteCmd", { identify: $('body').data('identify'), eprocess: "efwplusserver", method: "restartroute", arg: "" });
            }
        });

        $('#btn_restartwebapi').unbind('click').click(function () {
            var result = confirm('是否执行此操作？');
            if (result) {
                common.simpleAjax("Monitor/ExecuteRemoteCmd", { identify: $('body').data('identify'), eprocess: "efwplusserver", method: "restartwebapi", arg: "" });
            }
        });

        $('#btn_restartmongodb').unbind('click').click(function () {
            var result = confirm('是否执行此操作？');
            if (result) {
                common.simpleAjax("Monitor/ExecuteRemoteCmd", { identify: $('body').data('identify'), eprocess: "efwplusserver", method: "restartmongodb", arg: "" });
            }
        });

        $('#btn_restartnginx').unbind('click').click(function () {
            var result = confirm('是否执行此操作？');
            if (result) {
                common.simpleAjax("Monitor/ExecuteRemoteCmd", { identify: $('body').data('identify'), eprocess: "efwplusserver", method: "restartnginx", arg: "" });
            }
        });

        $('#btn_exit').unbind('click').click(function () {
            var result = confirm('是否执行此操作？');
            if (result) {
                common.simpleAjax("Monitor/ExecuteRemoteCmd", { identify: $('body').data('identify'), eprocess: "efwplusserver", method: "exit", arg: "" });
            }
        });
    }
    //测试远程服务
    function testservices() {
        common.simpleAjax("Monitor/GetRemoteServices", { identify: $('body').data('identify') }, function (data) {
            //$('#serviceTree').tree('closeAll');
            $('#serviceTree').tree({
                dataSource: function (options, callback) {
                    // 模拟异步加载
                    setTimeout(function () {
                        callback({ data: options.childs || data });
                    }, 40);
                },
                multiSelect: false,
                cacheItems: false,
                folderSelect: false
            }).on('selected.tree.amui', function (e, selected) {
                //console.log('Select Event: ', selected);
                //console.log($('#firstTree').tree('selectedItems'));
                $('#txt_plugin').val(selected.target.attr.plugin);
                $('#txt_controller').val(selected.target.attr.controller);
                $('#txt_method').val(selected.target.attr.method);
            });
        });
        
        $('#modal_remoteservices').modal({width:800});
        $('#btn_request').unbind('click').click(function () {
            var para = {identify: $('body').data('identify'), plugin: $('#txt_plugin').val(), controller: $('#txt_controller').val(), method: $('#txt_method').val(), para: $('#txt_parajson').val() };
            if (para.method && para.controller && para.plugin) {
                common.simpleAjax("Monitor/TestRemoteService", para, function (data) {
                    $('#txt_responsejson').val(data);
                });
            }
        });
    }
    //
    function showpage(menuId, templates) {
        common.simpleAjax("Monitor/GetMonitorMap", {}, function (data) {

            common.loadtemplate(menuId, templates, html_template, { data: common.toJson(data) });

            //data = { childs: data };
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
            }).on('selected.tree.amui', function (e, selected) {
                if (selected.target.attr && selected.target.attr.identify) {
                    $('body').data('identify', selected.target.attr.identify);
                } else {
                    $('body').data('identify', null);
                }
            });
            //$('#firstTree').tree('discloseAll');
            //刷新
            $('#btn_refresh').click(function () {
                showpage(menuId, templates);
            });
            //查看配置
            $('#btn_config').click(function () {
                var identify = $('body').data('identify');
                if (identify) {
                    common.simpleAjax("Monitor/GetRemoteNodeConfig", { identify: identify }, function (data) {
                        alert(data);
                    });
                }
            });
            //查看日志
            $('#btn_log').click(function () {
                var identify = $('body').data('identify');
                if (identify) {
                    getremotelog();
                }
            });
            //执行命令
            $('#btn_cmd').click(function () {
                var identify = $('body').data('identify');
                if (identify) {
                    getremotecmd();
                }
            });

            $('#btn_services').click(function () {
                var identify = $('body').data('identify');
                if (identify) {
                    testservices();
                }
            });
        });
    }

    return {
        showpage: showpage
    };
});