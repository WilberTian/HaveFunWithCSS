define([
    'backbone',
    'underscore',
    'vm',
    'views/components/menu/funItemSelector/FunItemSelectorView',
    'models/FunItemSelectorModel',
    'views/components/menu/funItemOperations/FunItemOperationsView',
    'text!views/components/menu/detailMenu/detailMenu.html'
], function(Backbone, _, Vm, FunItemSelectorView, FunItemSelectorModel, FunItemOperationsView, detailMenuTemplate){
    var DetailMenuView =  Backbone.View.extend({
        template: _.template(detailMenuTemplate),

        initialize: function() {
            this.listenTo(this.model, 'change:name', this.render);
        },

        render: function () {
            $(this.el).html(this.template());
            var modelJsonData = this.model.toJSON();

            var funItemSelectorView = Vm.create('funItemSelectorView', FunItemSelectorView, {model: new FunItemSelectorModel}, true).setElement(this.$('#fun-item-selector-menu'));
            funItemSelectorView.model.set({folder: modelJsonData.folder, name: modelJsonData.name, funItems: []}).fetch({
		    	success: function (model, response) {
			    },
			    error: function (error) {
			    }
		    });

            var funItemOperationsView = Vm.create('funItemOperationsView', FunItemOperationsView, {}, true);
            funItemOperationsView.setElement(this.$('#fun-item-operations-menu')).render();
            
            return this;
        }
    
    });

    return DetailMenuView;
});