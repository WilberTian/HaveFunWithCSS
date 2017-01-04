define([
    'backbone',
    'underscore',
    'text!views/components/funItemModal/funItemModal.html'
], function(Backbone, _, funItemModalTemplate){
    var FunItemModalView =  Backbone.View.extend({

        template: _.template(funItemModalTemplate),

        render: function () {
            $(this.el).html(this.template(this.model));
            return this;
        },

        events: {
            'click #create-fun-item-btn': 'createFunItem',
            'click #close-modal-btn': 'close'
        },

        open: function() {
			$(this.el).find('.ui.modal')
				.modal({ detachable: false })
				.modal('setting', 'closable', false)
				.modal('show');
		}, 

		close: function() {
			$(this.el).find('.ui.modal').modal('hide');
		},

        showErrMsg: function(error) {
            $(this.el).find('#error-msg p').html(error);
            $(this.el).find('#error-msg').show();
        },

        createFunItem: function() {	
			var folder = $(this.el).find('#fun-folder-in-modal').val();
			var name = $(this.el).find('#fun-name-in-modal').val();

            Backbone.trigger('createFunItemEvent', folder, name, this);
		},

        dispose: function() {
            this._dispose();
        }
    });

    return FunItemModalView;
});