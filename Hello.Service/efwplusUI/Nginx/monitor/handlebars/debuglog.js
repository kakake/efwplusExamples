define(['jquery', 'common', "handlebars.min", "text!../../handlebars/debuglog.html"], function ($, common, Handlebars, html_template) {

    //
    function showpage(menuId, templates, url) {

        common.simpleAjax(url || "mnodeconfig/debuglog?logtype=MidLog&date=", {}, function (data) {
            common.loadtemplate(menuId, templates, html_template, { data: common.toJson(data) });

            $('#logdate').datepicker('setValue', new Date());
            if ($('body').data('logtype')) {
                $('#logtype').val($('body').data('logtype'));
                //$('#logtype').find('option[value="' + $('body').data('logtype') + '"]').attr('selected', true);
            }
            $('#logtype').selected();

            $('#btn_logsearch').click(function () {
                $('body').data('logtype', $('#logtype').val());
                url = "mnodeconfig/debuglog?logtype=" + $('#logtype').val() + "&date=" + $('#logdate').data('date');
                showpage(menuId, templates, url);
            });
        });

    }

    return {
        showpage: showpage
    };
});