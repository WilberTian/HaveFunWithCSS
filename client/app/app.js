define([
	'jquery',
	'underscore',
    'backbone',
    'text!views/layout/layout.html',
    'text!views/components/funItemModal/funItemModal.html',
    'semantic'
], function($, _, Backbone, layoutTemplate, funItemModalTemplate){
    var AppView = Backbone.View.extend({
        el: $('#app-container'),
        
        funItemModalTemplate: _.template(funItemModalTemplate),

        initialize: function() {
        },

        render: function() {
            var self = this;
            $(self.el).html(layoutTemplate);

            require(['views/components/menu/brand/MenuBrandView'], function (MenuBrandView) {
                var menuBrandView = new MenuBrandView;
                menuBrandView.render();
            });
        },

        events: {
			'click #open-modal-btn': 'openFunItemModal'
        },

        openFunItemModal: function(e) {
            var funFolder = $(e.currentTarget).data('funfolder');

            require(['views/components/funItemModal/FunItemModalView'], function(FunItemModalView) {
                var funItemModalView = new FunItemModalView;
                funItemModalView.open(funFolder);
            });
		}

        
    });

    return AppView;
});
