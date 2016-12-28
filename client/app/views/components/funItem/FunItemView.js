define([
    'backbone',
    'underscore',
    'text!views/components/funItem/funItem.html'
], function(Backbone, _, funItemTemplate){
    var FunItemView =  Backbone.View.extend({
        template: _.template(funItemTemplate),

        render: function () {
            this.setElement(this.template({
				name: this.model.toJSON().name
            }));

            return this;
        }
    });

    return FunItemView;
});