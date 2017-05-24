define([
	'jquery',
	'underscore',
    'backbone',
    'vm',
    'text!views/layout/layout.html',
    'text!views/components/funItemModal/funItemModal.html',
    'views/components/notification/NotificationView',
    'semantic'
], function($, _, Backbone, Vm, layoutTemplate, funItemModalTemplate, NotificationView){
    var AppView = Backbone.View.extend({
        
        funItemModalTemplate: _.template(funItemModalTemplate),

        initialize: function() {
            Backbone.on('openFunItemModalEvent', function(folder) {
                require(['views/components/funItemModal/FunItemModalView', 'views/components/funItemModal/FunItemModalModel'], function(FunItemModalView, FunItemModalModel) {
                    var funItemModalView = Vm.create('funItemModalView', FunItemModalView, {model: new FunItemModalModel}, false).setElement($('#fun-item-modal'));
                    funItemModalView.model.set({funFolder: folder});
                });
            });
        },

        render: function() {
            $(this.el).html(layoutTemplate);

            var notificationView = new NotificationView;
            notificationView.setElement($('#notification-area'));

            require(['views/components/menu/brand/MenuBrandView'], function (MenuBrandView) {
                var menuBrandView = Vm.create('menuBrandView', MenuBrandView, {}, true);
                menuBrandView.setElement($('#menu-brand')).render();
            });

            return this;
        },

        events: {
			'click #open-modal-btn': 'openFunItemModal'
        },

        openFunItemModal: function(e) {
            var folder = $(e.currentTarget).data('funfolder');
            Backbone.trigger('openFunItemModalEvent', folder);
		}

    });

    return AppView;
});
