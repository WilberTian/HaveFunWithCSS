define([
    'backbone'
], function(Backbone) {
    var FunItemSelectorModel = Backbone.Model.extend({
		urlRoot: '/apis',
		url: function(){
			return this.urlRoot + '/' + this.get('folder');
		},

        parse: function(response) {
            return {
                funItems: response
            }
        }, 

		idAttribute: 'path'
	});

    return FunItemSelectorModel;
});