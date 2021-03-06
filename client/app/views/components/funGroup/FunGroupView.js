define([
    'backbone',
    'underscore',
    'vm',
    'text!views/components/funGroup/funGroup.html',
    'views/components/funItem/FunItemView'
], function(Backbone, _, Vm, funGroupTemplate, FunItemView){
    var FunGroupView =  Backbone.View.extend({
        template: _.template(funGroupTemplate),

        initialize: function() {
            var self = this;

			self.listenTo(self.model.funItems, 'add', self.createFunItem);

            Backbone.on('filterFunItemEvent', function(key) {
                var hasFunItemInGroup = _.some(self.model.funItems.models, function(funItemModel) {
                    return funItemModel.toJSON().name.indexOf(key) > -1
                });

                if(hasFunItemInGroup) {
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
				var funItemView = Vm.create('funItemView' + funItem.cid, FunItemView, {model: funItem}, true);
				$(self.el).find('.fun-item-list').append(funItemView.render().el);
			});

            return self;
        },

        createFunItem: function(funItem) {
			var funItemView = new FunItemView({model: funItem});
			$(this.el).find('.fun-item-list').append(funItemView.render().el);
		}
    });

    return FunGroupView;
});