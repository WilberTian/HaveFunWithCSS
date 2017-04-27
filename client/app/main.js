require.config({
    paths: {
        jquery: '/client/vendor/jquery/jquery.min',
        underscore: '/client/vendor/underscore/underscore.min',
        backbone: '/client/vendor/backbone/backbone.min',
        semantic: '/client/vendor/semantic-ui/semantic.min',
        codemirror: '/client/vendor/codemirror/js',
        masonry: '/client/vendor/masonry/masonry.pkgd.min',

        text: '/client/vendor/require/text'
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
