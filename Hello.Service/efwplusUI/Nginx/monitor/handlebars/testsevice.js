define(['jquery', 'common', "handlebars.min", "text!../../handlebars/testsevice.html", "amazeui.tree.min"], function ($, common, Handlebars, html_template) {
    //
    function showpage(menuId,templates) {
        common.simpleAjax("TestServices/GetAllServices", {}, function (data) {

            common.loadtemplate(menuId, templates, html_template, data);

            $('#firstTree').tree({
                dataSource: function (options, callback) {
                    // 模拟异步加载
                    setTimeout(function () {
                        callback({ data: options.childs || data });
                    }, 40);
                },
                multiSelect: false,
                cacheItems: true,
                folderSelect: false
            }).on('selected.tree.amui', function (e, selected) {
                //console.log('Select Event: ', selected);
                //console.log($('#firstTree').tree('selectedItems'));
                $('#txt_plugin').val(selected.target.attr.plugin);
                $('#txt_controller').val(selected.target.attr.controller);
                $('#txt_method').val(selected.target.attr.method);
            });

            $('#btn_request').click(function () {
                var para = { plugin: $('#txt_plugin').val(), controller: $('#txt_controller').val(), method: $('#txt_method').val(), para: $('#txt_parajson').val() };
                if (para.method && para.controller && para.plugin) {
                    common.simpleAjax("TestServices/TestServices", para, function (data) {
                        $('#txt_responsejson').val(data);
                    });
                }
            });
        });
    }

    return {
        showpage: showpage
    };
});