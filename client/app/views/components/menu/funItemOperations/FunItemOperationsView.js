define([
    'backbone',
    'text!views/components/menu/funItemOperations/funItemOperations.html'
], function(Backbone, funItemOperationsTemplate){
    var FunItemOperationsView =  Backbone.View.extend({
        events: {
            'click #fun-item-operations .try-it': 'runFunItem',
            'click #fun-item-operations .update': 'updateFunItem',
			'click #fun-item-operations .delete': 'openConfirmModal'
        },

        render: function () {
            $(this.el).html(funItemOperationsTemplate);
        },

        runFunItem: function() {
		    Backbone.trigger('runFunItemEvent');
		},

        updateFunItem: function() {
            Backbone.trigger('updateFunItemEvent');
	    },

		openConfirmModal: function() {
            Backbone.trigger('openConfirmModalEvent');
		}

    });

    return FunItemOperationsView;
});