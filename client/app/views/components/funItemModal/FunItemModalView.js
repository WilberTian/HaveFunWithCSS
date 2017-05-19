define([
    'backbone',
    'underscore',
    'text!views/components/funItemModal/funItemModal.html'
], function(Backbone, _, funItemModalTemplate){
    var FunItemModalView =  Backbone.View.extend({

        template: _.template(funItemModalTemplate),

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));

            this.open();

            return this;
        },

        events: {
            'click #create-fun-item-btn': 'createFunItem',
            'click #close-modal-btn': 'close'
        },

        open: function() {
            var self = this;
			$(self.el).find('.ui.modal')
				.modal({ 
                    detachable: false,
                    autofocus: false,
                    onVisible: function(){
                        setTimeout(function() {
                            if(self.model.toJSON().funFolder) {
                                $(self.el).find('#fun-name-in-modal').focus();
                            } else {
                                $(self.el).find('#fun-folder-in-modal').focus();
                            }
                            
                        }, 0);                        
                    }
                 })
				.modal('setting', 'closable', false)
				.modal('show');
		}, 

		close: function() {
            $(this.el).find('.ui.modal').modal('hide');
			this.undelegateEvents();
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