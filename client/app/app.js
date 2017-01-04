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
            var funFolder = $(e.currentTarget).data('funfolder');

            require(['views/components/funItemModal/FunItemModalView'], function(FunItemModalView) {
                var funItemModalView = Vm.create('funItemModalView', FunItemModalView, {model: {funFolder: funFolder}}, true);
                funItemModalView.model = {funFolder: funFolder};
                funItemModalView.setElement($('#fun-item-modal')).render();
                funItemModalView.open()
            });
		}

        
    });

    return AppView;
});
