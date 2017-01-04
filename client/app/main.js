require.config({
    paths: {
        jquery: '/vendor/jquery/jquery.min',
        underscore: '/vendor/underscore/underscore.min',
        backbone: '/vendor/backbone/backbone.min',
        semantic: '/vendor/semantic-ui/semantic.min',
        codemirror: '/vendor/codemirror/js',

        text: '/vendor/require/text'
    },

    shim: {
        'semantic': ['jquery']
    }
});

require([
    'app',
    'router',
    'vm'
], function (AppView, Router, Vm) {

    _.extend(Backbone.View.prototype, {
        _dispose: function() {
            this.undelegateEvents();
            this.stopListening()
            $(this.el).children().remove();

            return this;
        }
    });

    var appView = Vm.create('appView', AppView, {}, true);
    appView.setElement($('#app-container')).render();
    
    Router.initialize({ appView: appView });  // The router now has a copy of all main appview
});
