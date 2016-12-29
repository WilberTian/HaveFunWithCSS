define([
    'backbone',
    'text!views/components/menu/indexMenu/indexMenu.html'
], function(Backbone, indexMenuTemplate){
    var IndexMenuView =  Backbone.View.extend({
        el: $('#app-menu'),

        events: {
            'keyup #fun-item-filter': 'filterFunItem',
        },

        render: function () {
            $(this.el).html(indexMenuTemplate);
        },

        filterFunItem: function(e) {
            Backbone.trigger('filterFunItemEvent', e.target.value);
        }
    });

    return IndexMenuView;
});