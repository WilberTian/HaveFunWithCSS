define([
    'backbone',
    'underscore',
    'text!views/pages/funGroupList/funGroupList.html',
    'models/FunGroupCollection',
    'views/components/funGroup/FunGroupView',
    'views/components/notification/NotificationView'
], function(Backbone, _, funGroupListTemplate, FunGroupCollection, FunGroupView, NotificationView){
    var FunGroupListView =  Backbone.View.extend({
        el: $('#app-content'),

        initialize: function() {
            new NotificationView;

            var self = this;

            self.funGroupCollection = new FunGroupCollection;

            self.listenTo(self.funGroupCollection, 'add', self.render);
			self.listenTo(self.funGroupCollection, 'sync', self.render);

            Backbone.on('createFunItemEvent', function(folder, name, modal) {
                
                var funGroupModel = self.funGroupCollection.where({folder: folder})[0];

                // create fun group if not exist
                if(funGroupModel === undefined) {
                    require(['models/FunGroupModel'], function(FunGroupModel) {
                        funGroupModel = new FunGroupModel({count: 1, folder: folder, funItems:[]});
                        self.funGroupCollection.add(funGroupModel);
                    });
                }

                funGroupModel.funItems.create({folder: folder, name: name }, {
                    url: '/apis/funlist',
                    wait: true,
                    success: function (model, response) {
                        modal.close()
                        Backbone.trigger('notificationEvent', 'Fun item created successfully');
                    },
                    error: function (model, error) {
                        modal.showErrMsg(error.responseText);
                    }
                })

            });
        },

        render: function () {
            var self = this;
            
            $(self.el).html(funGroupListTemplate);
            
            self.funGroupCollection.models.forEach(function(funGroupModel) {
                var funGroupView = new FunGroupView({model: funGroupModel});
                $(self.el).find('#fun-group-list').append(funGroupView.render().el);
            });

        },

        

    });

    return FunGroupListView;
});