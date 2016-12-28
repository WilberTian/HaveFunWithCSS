define([
    'backbone',
    'text!views/components/menu/brand/brand.html'
], function(Backbone, brandTemplate){
    var MenuBrandView =  Backbone.View.extend({
        el: $('#app-menu'),

        render: function () {
            $(this.el).prepend(brandTemplate);
        }
    });

    return MenuBrandView;
});