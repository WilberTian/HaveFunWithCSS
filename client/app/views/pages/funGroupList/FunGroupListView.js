define([
    'backbone',
    'underscore',
    'masonry',
    'vm',
    'text!views/pages/funGroupList/funGroupList.html',
    'views/components/funGroup/FunGroupView'
], function(Backbone, _, Masonry, Vm, funGroupListTemplate, FunGroupView, NotificationView){
    var FunGroupListView =  Backbone.View.extend({

        initialize: function() {
            var self = this;

			self.listenTo(self.model, 'sync', self.render);

            Backbone.on('createFunItemEvent', function(folder, name, modal) {
                
                var funGroupModel = self.model.where({folder: folder})[0];

                // create fun group if not exist
                if(funGroupModel === undefined) {
                    require(['models/FunGroupModel'], function(FunGroupModel) {
                        funGroupModel = new FunGroupModel({count: 1, folder: folder, funItems:[]});
                        self.model.add(funGroupModel);
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

            self.model.models.forEach(function(funGroupModel) {
                var funGroupView = Vm.create('funGroupView' + funGroupModel.cid, FunGroupView, {model: funGroupModel}, true);
                $(self.el).find('#fun-group-list').append(funGroupView.render().el);
            });

             new Masonry('.fun-group-grid', {
                itemSelector: '.fun-group-grid-item',
                columnWidth: 280,
                gutter: 24
            })

        }

    });

    return FunGroupListView;
});