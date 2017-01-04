define([
    'backbone',
    'jquery',
    'underscore',
    'text!views/components/menu/funItemSelector/funItemSelector.html'
], function(Backbone, $, _, funItemSelectorTemplate){
    var FunItemSelectorView =  Backbone.View.extend({        
        template: _.template(funItemSelectorTemplate),

        initialize: function() {
            this.listenTo(this.model, 'sync', this.render);
        },

        events: {
            'change #selectedFunItemName': 'changeFunItem'
        },

        render: function () {   
            var selectorEle = this.template(this.model.toJSON());
            $(this.el).html(selectorEle);
            $(this.el).find('.ui.selection.dropdown').dropdown();
        },

        changeFunItem: function(e) {
            Backbone.trigger('selectFunItemEvent', e.target.value);
        },

        dispose: function() {
            this._dispose();
        }

    });

    return FunItemSelectorView;
});