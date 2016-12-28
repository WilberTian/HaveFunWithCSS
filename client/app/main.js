require.config({
    paths: {
        jquery: '/vendor/jquery/jquery.min',
        underscore: '/vendor/underscore/underscore.min',
        backbone: '/vendor/backbone/backbone.min',
        semantic: '/vendor/semantic-ui/semantic.min',
        codemirror: '/vendor/codemirror/js/codemirror.min',

        text: '/vendor/require/text'
    }
});

require([
    'app',
    'router'
], function (AppView, Router) {
    var appView = new AppView;
    appView.render();
    Router.initialize({ appView: appView });  // The router now has a copy of all main appview
});
