define([
    'backbone',
    'models/FunItemModel'
], function(Backbone, FunItemModel) {
    var FunItemCollection = Backbone.Collection.extend({
		model: FunItemModel
	});

    return FunItemCollection;
});