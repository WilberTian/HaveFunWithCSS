define([
    'backbone',
    'underscore',
    'text!views/components/funItem/funItem.html'
], function(Backbone, _, funItemTemplate){
    var FunItemView =  Backbone.View.extend({
        template: _.template(funItemTemplate),

        initialize: function() {
            var self = this;

            Backbone.on('filterFunItemEvent', function(key) {
                if(self.model.get('name').indexOf(key) > -1) {
					self.$el.show();
				} else {
					self.$el.hide();
				}
            });
		},

        events: {
	      	'click .fun-group-item': 'selectFunItem'
	    },

        render: function () {
            $(this.el).html(this.template({
				name: this.model.toJSON().name
            }));

            return this;
        },

        selectFunItem: function() {
	    	Backbone.trigger('selectFunItemEvent', this.model.toJSON().path);
	    }
    });

    return FunItemView;
});