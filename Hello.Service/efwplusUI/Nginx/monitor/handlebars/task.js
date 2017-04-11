define(['jquery', 'common', "handlebars.min", "text!../../handlebars/task.html"], function ($, common, Handlebars, html_template) {

    //
    function show_page(menuId, templates) {

        common.simpleAjax("mnodeconfig/GetTaskList", {}, function (data) {

            common.loadtemplate(menuId, templates, html_template, { data: common.toJson(data) });
        });
    }

    return {
        showpage: show_page
    };
});