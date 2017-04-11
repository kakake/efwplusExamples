define(['jquery', 'common', "handlebars.min", "text!../../handlebars/sevicelist.html"], function ($, common, Handlebars, html_template) {

    //
    function show_page(menuId, templates) {

        common.simpleAjax("mnodeconfig/sevicelist", {}, function (data) {

            common.loadtemplate(menuId, templates, html_template, { data: common.toJson(data) });
        });
    }

    return {
        showpage: show_page
    };
});