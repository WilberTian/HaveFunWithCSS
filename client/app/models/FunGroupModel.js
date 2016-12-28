define([
    'backbone',
    'models/FunItemCollection'
], function(Backbone, FunItemCollection) {
    var FunGroupModel = Backbone.Model.extend({
		initialize: function(data) {
			this.funItems = new FunItemCollection(data.funItems);
		}
	});

    return FunGroupModel;
});