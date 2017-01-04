define([
    'backbone'
], function(Backbone) {
    var ConfirmModalModel = Backbone.Model.extend({
		defaults: {
            name: '',
            folder: ''
        }
	});

    return ConfirmModalModel;
});