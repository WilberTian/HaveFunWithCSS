define([
    'backbone',
    'underscore',
    'text!views/components/confirmModal/confirmModal.html'
], function(Backbone, _, confirmModalTemplate){
    var ConfirmModalView =  Backbone.View.extend({

        template: _.template(confirmModalTemplate),

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));

            this.open();
            return this;
        },

        events: {
            'click #delete-fun-item-btn': 'deleteFunItem',
            'click #close-confirm-modal-btn': 'close'
        },

        open: function(selectedFunItem) {
			$(this.el)
				.modal({ detachable: false })
				.modal('setting', 'closable', false)
				.modal('show');
		},

        close: function() {
			$(this.el).modal('hide');
		},

        deleteFunItem: function() {
            Backbone.trigger('deleteFunItemEvent');
        }
    });

    return ConfirmModalView;
});