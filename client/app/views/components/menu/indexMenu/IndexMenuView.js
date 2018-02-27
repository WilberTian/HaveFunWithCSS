define([
    'backbone',
    'text!views/components/menu/indexMenu/indexMenu.html'
], function(Backbone, indexMenuTemplate){
    var IndexMenuView =  Backbone.View.extend({

        initialize: function() {
            self._filterFunItem = _.debounce(function(value) {
                Backbone.trigger('filterFunItemEvent', value);
                
                var timer = setTimeout(function() {
                    Backbone.trigger('updateLayoutEvent');
                    clearTimeout(timer);
                }, 0);
            }, 500);
        },

        events: {
            'keyup #fun-item-filter': 'filterFunItem',
        },

        render: function () {
            $(this.el).html(indexMenuTemplate);

            return this;
        },

        filterFunItem: function(e) {
            self._filterFunItem(e.target.value);
        }
    });

    return IndexMenuView;
});