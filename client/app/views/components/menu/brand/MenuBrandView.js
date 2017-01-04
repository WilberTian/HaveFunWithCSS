define([
    'backbone',
    'text!views/components/menu/brand/brand.html'
], function(Backbone, brandTemplate){
    var MenuBrandView =  Backbone.View.extend({

        events: {
            'click .item': 'gotoIndex'
        },

        render: function () {
            $(this.el).html(brandTemplate);

            return this;
        },

        gotoIndex: function() {
            Backbone.trigger('navigateEvent', 'index');
        }
    });

    return MenuBrandView;
});