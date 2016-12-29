define([
    'backbone',
    'text!views/components/menu/brand/brand.html'
], function(Backbone, brandTemplate){
    var MenuBrandView =  Backbone.View.extend({
        el: $('#menu-brand'),

        render: function () {
            $(this.el).html(brandTemplate);
        }
    });

    return MenuBrandView;
});