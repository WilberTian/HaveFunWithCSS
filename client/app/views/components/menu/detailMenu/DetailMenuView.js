define([
    'backbone',
    'underscore',
    'views/components/menu/funItemSelector/FunItemSelectorView',
    'models/FunItemSelectorModel',
    'views/components/menu/funItemOperations/FunItemOperationsView',
    'text!views/components/menu/detailMenu/detailMenu.html'
], function(Backbone, _, FunItemSelectorView, FunItemSelectorModel, FunItemOperationsView, detailMenuTemplate){
    var DetailMenuView =  Backbone.View.extend({
        el: $('#app-menu'),

        template: _.template(detailMenuTemplate),

        initialize : function(){
            var funItemSelectorModel = new FunItemSelectorModel({folder: this.model.folder, name: this.model.name, funItems: []});
            this.funItemSelectorView = new FunItemSelectorView({model: funItemSelectorModel});
            this.funItemOperationsView = new FunItemOperationsView;
        },

        render: function () {
            $(this.el).html(this.template());
            this.funItemSelectorView.setElement(this.$('#fun-item-selector-menu')).render();
            this.funItemOperationsView.setElement(this.$('#fun-item-operations-menu')).render();
        }
    });

    return DetailMenuView;
});