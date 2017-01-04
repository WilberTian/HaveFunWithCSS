define([
    'backbone'
], function(Backbone) {
    var DetailMenuModel = Backbone.Model.extend({
		defaults: {
            folder: '',
            name: ''
        }
	});

    return DetailMenuModel;
});