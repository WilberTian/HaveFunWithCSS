define([
    'backbone',
    'text!views/components/menu/funItemOperations/funItemOperations.html'
], function(Backbone, funItemOperationsTemplate){
    var FunItemOperationsView =  Backbone.View.extend({
        el: $('#app-menu'),

        events: {
            
        },

        render: function () {
            $(this.el).append(funItemOperationsTemplate);
        },

    });

    return FunItemOperationsView;
});