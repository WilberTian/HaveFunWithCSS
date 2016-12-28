define([
    'backbone',
    'underscore',
    'text!views/components/menu/funItemSelector/funItemSelector.html'
], function(Backbone, _, funItemSelectorTemplate){
    var FunItemSelectorView =  Backbone.View.extend({
        el: $('#app-menu'),

        template: _.template(funItemSelectorTemplate),

        initialize: function() {
            Backbone.on('selectFunItemEvent', function(folder, name) {

            })
        },

        events: {
            
        },

        render: function () {
            var selectorEle = this.template({
                folder:'asd',
                name: 'adf',
                funItems: ['adf', 'asdf']
            
            });

            $(selectorEle).insertAfter($(this.el).children());
            $('.ui.selection.dropdown').dropdown();
        },

    });

    return FunItemSelectorView;
});