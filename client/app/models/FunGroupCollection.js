define([
    'backbone',
    'models/FunGroupModel'
], function(Backbone, FunGroupModel) {
    var FunGroupCollection = Backbone.Collection.extend({
		url: '/apis/funlist/',
		
		model: FunGroupModel,

		initialize: function(){
		    this.fetch({
		    	success: function (model, response) {
			        Backbone.trigger('notificationEvent', 'Fun list fetched successfully');
			    },
			    error: function (error) {
			    }
		    });
		}
	});

    return FunGroupCollection;
});