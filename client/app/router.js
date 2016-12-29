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
            require(['views/components/menu/detailMenu/DetailMenuView'], function (DetailMenuView) {
                var detailMenuView = new DetailMenuView({model: {folder: folder, name: name}});
                detailMenuView.render();
            });

            require(['views/pages/funItemDetail/FunItemDetailView', 'models/FunItemModel'], function (FunItemDetailView, FunItemModel) {

                var funItemModel = new FunItemModel({path: folder + '/' + name, funContent: ''});
                var funGroupListView = new FunItemDetailView({model: funItemModel});
                funGroupListView.render();
            });
            
        });

        Backbone.history.start();

        Backbone.on('selectFunItemEvent', function(funItemPath) {
            var url = window.encodeURI('detail/' + funItemPath.replace('\\', '/'));
            router.navigate(url, {  
                trigger: true  
            });	 	
        });

        Backbone.on('navigateEvent', function(url) {
            router.navigate(url, {  
                trigger: true  
            });	 
        });
    };


    return {
        initialize: initialize
    };
});