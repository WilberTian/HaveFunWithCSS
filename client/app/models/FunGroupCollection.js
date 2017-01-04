define([
    'backbone',
    'models/FunGroupModel'
], function(Backbone, FunGroupModel) {
    var FunGroupCollection = Backbone.Collection.extend({
		url: '/apis/funlist/',
		
		model: FunGroupModel
	});

    return FunGroupCollection;
});