require.config({
    baseUrl: 'assets/js',
    map: {
        '*': {
            'css': 'css.min',
            'text': 'text'
        }
    },
    paths: {
        //text: 'text',
        //css: 'css.min',
        "jquery": 'jquery.min',
        "amazeui": 'amazeui.min',
        "jquery.json": 'jquery.json-2.3.min',
        "common": '../../js/common',
        "login": "../../js/login",
        "app":"app",
        "index": '../../js/index'
    },
    shim: {
        "amazeui": ["jquery"],
        "amazeui.tree.min": ["jquery", "css!../css/amazeui.tree.min.css"],
        "jquery.cookie": ["jquery"],
        "jquery.formatDateTime.min": ["jquery"],
        "jquery.json": ["jquery"],
        "jquery.upload": ["jquery"],
        "app": ["jquery", "amazeui"],
        "login": ["amazeui"],
        "index": ["amazeui", "app", "jquery", "jquery.cookie", "director.min"]
    },
    waitSeconds: 50
});

//requirejs(["amazeui.min","app", "index"]);