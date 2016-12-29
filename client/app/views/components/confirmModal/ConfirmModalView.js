define([
    'backbone',
    'underscore',
    'text!views/components/confirmModal/confirmModal.html'
], function(Backbone, _, confirmModalTemplate){
    var ConfirmModalView =  Backbone.View.extend({
        el: $('#confirm-modal'),

        template: _.template(confirmModalTemplate),

        render: function () {
        },

        events: {
            'click #delete-fun-item-btn': 'deleteFunItem',
            'click #close-confirm-modal-btn': 'close'
        },

        open: function(selectedFunItem) {
			$(this.el).html(this.template({ name: selectedFunItem.name + '@' + selectedFunItem.folder }));
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