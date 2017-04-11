define(['jquery', 'common', "handlebars.min", "text!../../handlebars/clientlist.html", "jquery.formatDateTime.min"], function ($, common, Handlebars, html_template) {
    //
    function showpage(menuId, templates) {
        //时间格式化
        Handlebars.registerHelper("todate", function (value) {
            return $.formatDateTime('yy-mm-dd g:ii:ss', new Date(value));
        });

        common.simpleAjax("mnodeconfig/clientlist", {}, function (data) {
            common.loadtemplate(menuId, templates, html_template, { data: common.toJson(data) });

            $('.btn-clientlist-refresh').click(function () {
                showpage(menuId, templates);
            });
        });
    }

    return {
        showpage: showpage
    };
});