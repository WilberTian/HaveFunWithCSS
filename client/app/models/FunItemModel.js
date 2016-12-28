define([
    'backbone'
], function(Backbone) {
    var FunItemModel = Backbone.Model.extend({
		urlRoot: '/apis',
		url: function(){
			return this.urlRoot + '/' + this.get('path').replace('\\', '/');
		},

		idAttribute: 'path'
	});

    return FunItemModel;
});