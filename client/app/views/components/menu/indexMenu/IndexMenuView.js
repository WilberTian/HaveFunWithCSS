define([
    'backbone',
    'text!views/components/menu/indexMenu/indexMenu.html'
], function(Backbone, indexMenuTemplate){
    var IndexMenuView =  Backbone.View.extend({
        events: {
            'keyup #fun-item-filter': 'filterFunItem',
        },

        render: function () {
            $(this.el).html(indexMenuTemplate);

            return this;
        },

        filterFunItem: function(e) {
            Backbone.trigger('filterFunItemEvent', e.target.value);
        }
    });

    return IndexMenuView;
});