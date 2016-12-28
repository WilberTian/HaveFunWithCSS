define([
    'backbone',
    'underscore',
    'text!views/components/funItemModal/funItemModal.html'
], function(Backbone, _, funItemModalTemplate){
    var FunItemModalView =  Backbone.View.extend({
        el: $('#fun-item-modal'),

        template: _.template(funItemModalTemplate),

        render: function () {
        },

        events: {
            'click #create-fun-item-btn': 'createFunItem',
            'click #close-modal-btn': 'close'
        },

        open: function(funFolder) {
			$(this.el).html(this.template({funFolder: funFolder}));
			$(this.el)
				.modal({ detachable: false })
				.modal('setting', 'closable', false)
				.modal('show');
		}, 

		close: function() {
			$(this.el).modal('hide');
		},

        showErrMsg: function(error) {
            $(this.el).find('#error-msg p').html(error);
            $(this.el).find('#error-msg').show();
        },

        createFunItem: function() {	
			var folder = $('#fun-folder-in-modal').val();
			var name = $('#fun-name-in-modal').val();

            Backbone.trigger('createFunItemEvent', folder, name, this);
		}
    });

    return FunItemModalView;
});