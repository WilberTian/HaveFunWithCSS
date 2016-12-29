define([
    'backbone',
    'text!views/components/menu/indexMenu/indexMenu.html'
], function(Backbone, indexMenuTemplate){
    var IndexMenuView =  Backbone.View.extend({
        el: $('#app-menu'),

        events: {
            'keyup #fun-filter': 'filterFunGroup',
        },

        render: function () {
            $(this.el).html(indexMenuTemplate);
        },

        filterFunGroup: function(e) {
            Backbone.trigger('filterFunGroupEvent', e.target.value);
        }
    });

    return IndexMenuView;
});