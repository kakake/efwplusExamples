define(['jquery', "handlebars.min", 'jquery.cookie'], function ($, Handlebars) {
    var baseUrl = "http://" + window.location.hostname + ":8021/efwapi/";
    var token = $.cookie("token");
    function simpleAjax(requestUrl, requestData, callback, errorback) {
        $.ajax({
            type: "get",
            url: baseUrl + requestUrl,
            data: $.extend(requestData, {"token":token}),
            crossDomain: true,
            //beforeSend: function (xhr) {
            //    //发送ajax请求之前向http的head里面加入验证信息
            //    xhr.setRequestHeader("Authorization", 'BasicAuth ' + token);  // 请求发起前在头部附加token
            //},
            success: function (retdata) {
                if (callback)
                    callback(retdata);
            },
            error: function () {
                if (errorback)
                    errorback();
            }
        });
    }

    function postAjax(requestUrl, requestData, callback, errorback) {
        $.ajax({
            type: "post",
            url: baseUrl + requestUrl+"?token="+token,
            data: requestData,
            //beforeSend: function (xhr) {
            //    //发送ajax请求之前向http的head里面加入验证信息
            //    xhr.setRequestHeader("Authorization", 'BasicAuth ' + token);  // 请求发起前在头部附加token
            //},
            success: function (retdata) {
                if (callback)
                    callback(retdata);
            },
            error: function () {
                if (errorback)
                    errorback();
            }
        });
    }
    function validateuser() {
        
        simpleAjax('login/validatetoken', { token: token }, function (data) {
            if (!data.flag) {
                $.cookie("token", null);//注销就删除cookie
                window.location.href = 'login.html';
            } else {
                $('#username').text(data.username);
            }
        }, function () {
            window.location.href = 'login.html';
        });
    }

    //加载模板
    function loadtemplate(menuId,templates, html_template,data) {
        if (!templates[menuId]) {
            $('#content_body').html(html_template);//加载html模板文本
            //设置多个url和模板
            //urls[menuId] = apiurl;
            templates[menuId] = Handlebars.compile($("#" + menuId + "-template").html());
        }

        var html = templates[menuId](data);
        $('#content_body').html(html);
    }

    function isJson(obj) {
        var isjson = typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
        return isjson;
    }

    function toJson(value) {
        try {
            if (!isJson(value)) {
                return eval('(' + value + ')');
            } else {
                return value;
            }
        }
        catch (er) {
            return value;
        }
    }

    return {
        baseUrl:baseUrl,
        simpleAjax: simpleAjax,
        postAjax:postAjax,
        validateuser: validateuser,
        loadtemplate:loadtemplate,
        isJson: isJson,
        toJson: toJson
    };
});