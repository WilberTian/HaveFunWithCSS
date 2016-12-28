define([
    'backbone',
    'underscore',
    'text!views/components/funGroup/funGroup.html',
    'views/components/funItem/FunItemView'
], function(Backbone, _, funGroupTemplate, FunItemView){
    var FunGroupView =  Backbone.View.extend({
        template: _.template(funGroupTemplate),

        initialize: function() {
            var self = this;

			self.listenTo(self.model.funItems, 'add', self.createFunItem);

            Backbone.on('filterFunGroupEvent', function(key) {
                if(self.model.get('folder').indexOf(key) > -1) {
					self.$el.show();
				} else {
					self.$el.hide();
				}
            });
        },

        render: function () {
            var self = this;

            self.setElement(self.template({
				folder: self.model.toJSON().folder,
				funItemNum: self.model.toJSON().count
			}));

            self.model.funItems.forEach(function(funItem) {
				var funItemView = new FunItemView({model: funItem});
				$(self.el).find('.description').append(funItemView.render().el);
			});

            return self;
        },

        createFunItem: function(funItem) {
			var funItemView = new FunItemView({model: funItem});
			$(this.el).find('.description').append(funItemView.render().el);
		}
    });

    return FunGroupView;
});