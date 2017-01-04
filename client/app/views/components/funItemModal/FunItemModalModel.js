define([
    'backbone'
], function(Backbone) {
    var FunItemModalModel = Backbone.Model.extend({
		defaults: {
            funFolder: ''
        }
	});

    return FunItemModalModel;
});