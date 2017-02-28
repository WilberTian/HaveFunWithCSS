define([
    'backbone',
    'text!views/components/menu/funItemOperations/funItemOperations.html'
], function(Backbone, funItemOperationsTemplate){
    var FunItemOperationsView =  Backbone.View.extend({
        template: _.template(funItemOperationsTemplate),
        
        events: {
            'click #fun-item-operations .try-it': 'runFunItem',
            'click #fun-item-operations .update': 'updateFunItem',
			'click #fun-item-operations .delete': 'openConfirmModal',
            'click #fun-item-operations .view-mode': 'changeViewMode'
        },

        render: function () {
             var funItemOperationsEle = this.template(this.model.toJSON());
            $(this.el).html(funItemOperationsEle);
        },

        runFunItem: function() {
		    Backbone.trigger('runFunItemEvent');
		},

        updateFunItem: function() {
            Backbone.trigger('updateFunItemEvent');
	    },

		openConfirmModal: function() {
            Backbone.trigger('openConfirmModalEvent');
		},

        changeViewMode: function() {
            Backbone.trigger('changeViewModeEvent');
        },

        dispose: function() {
            this._dispose();
        }

    });

    return FunItemOperationsView;
});