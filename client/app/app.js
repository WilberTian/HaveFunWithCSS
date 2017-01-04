define([
	'jquery',
	'underscore',
    'backbone',
    'vm',
    'text!views/layout/layout.html',
    'text!views/components/funItemModal/funItemModal.html',
    'semantic'
], function($, _, Backbone, Vm, layoutTemplate, funItemModalTemplate){
    var AppView = Backbone.View.extend({
        
        funItemModalTemplate: _.template(funItemModalTemplate),

        render: function() {
            $(this.el).html(layoutTemplate);

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
            require(['views/components/funItemModal/FunItemModalView', 'views/components/funItemModal/FunItemModalModel'], function(FunItemModalView, FunItemModalModel) {
                var funItemModalView = Vm.create('funItemModalView', FunItemModalView, {model: new FunItemModalModel}, true).setElement($('#fun-item-modal'));
                funItemModalView.model.set({funFolder: $(e.currentTarget).data('funfolder')});
            });
		}

        
    });

    return AppView;
});
