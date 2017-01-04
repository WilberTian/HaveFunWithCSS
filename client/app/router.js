define([
    'backbone',
    'vm'
], function(Backbone, Vm) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            'index': 'index',
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
                var indexMenuView = Vm.create('indexMenuView', IndexMenuView, {}, true);
                indexMenuView.setElement($('#app-menu')).render();
            });

            require(['views/pages/funGroupList/FunGroupListView', 'models/FunGroupCollection'], function (FunGroupListView, FunGroupCollection) {
                var funGroupListView = Vm.create('funGroupListView', FunGroupListView, {model: new FunGroupCollection}, true).setElement($('#app-content'));
                funGroupListView.model.fetch({
                    success: function (model, response) {
                        Backbone.trigger('notificationEvent', 'Fun list fetched successfully');
                    },
                    error: function (error) {
                    }
                });

            });
        });

        router.on('route:detail', function(folder, name) {
            require(['views/components/menu/detailMenu/DetailMenuView', 'views/components/menu/detailMenu/DetailMenuModel'], function (DetailMenuView, DetailMenuModel) {
                var detailMenuView = Vm.create('detailMenuView', DetailMenuView, {model: new DetailMenuModel}, true).setElement($('#app-menu'));
                detailMenuView.model.set({folder: folder, name: name});
            });

            require(['views/pages/funItemDetail/FunItemDetailView', 'models/FunItemModel'], function (FunItemDetailView, FunItemModel) {
                var funItemDetailView = Vm.create('funItemDetailView', FunItemDetailView, {model: new FunItemModel}, true).setElement($('#app-content'));
                funItemDetailView.model.set({path: folder + '/' + name, funContent: ''}).fetch({
                    success: function(model, response) {
                        Backbone.trigger('notificationEvent', 'Fun item loaded successfully');
                    },
                    error: function(error) {

                    }
                });
                
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