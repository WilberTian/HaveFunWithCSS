define([
    'backbone'
], function(Backbone) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'index',
            'detail/:folder/:name': 'detail',

            // Default - catch all
            '*actions': 'index'
        }
    });

    var initialize = function(options) {
        var appView = options.appView;
        var router = new AppRouter(options);

        router.on('route:index', function() {
            require(['views/components/menu/indexMenu/IndexMenuView'], function (IndexMenuView) {
                var indexMenuView = new IndexMenuView;
                indexMenuView.render();
            });

            require(['views/pages/funGroupList/FunGroupListView'], function (FunGroupListView) {
                var funGroupListView = new FunGroupListView;
                funGroupListView.render();
            });
        });

        router.on('route:detail', function(folder, name) {
            require(['views/components/menu/funItemSelector/FunItemSelectorView'], function (FunItemSelectorView) {
                var funItemSelectorView = new FunItemSelectorView;
                funItemSelectorView.render();
            });

            require(['views/components/menu/funItemOperations/FunItemOperationsView'], function (FunItemOperationsView) {
                var funItemOperationsView = new FunItemOperationsView;
                funItemOperationsView.render();
            });

            require(['views/pages/funItemDetail/FunItemDetailView'], function (FunItemDetailView) {
                var funGroupListView = new FunItemDetailView;
                funGroupListView.render();
            });

            Backbone.trigger('selectFunItemEvent', folder, name);
            
        });

        Backbone.history.start();
    };


    return {
        initialize: initialize
    };
});