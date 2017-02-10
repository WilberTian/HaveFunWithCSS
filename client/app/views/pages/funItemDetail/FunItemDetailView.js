define([
    'backbone',
    'underscore',
    'vm',
    'text!views/pages/funItemDetail/funItemDetail.html',
    'utils/resizer',
    'codemirror/lib/codemirror',
    'codemirror/mode/htmlmixed/htmlmixed'
], function (Backbone, _, Vm, funItemDetailTemplate, Resizer, CodeMirror) {
    var FunItemDetailView = Backbone.View.extend({

        template: _.template(funItemDetailTemplate),

        initialize: function () {
            var self = this;

            self.listenTo(self.model, 'sync', self.render);
            
            Backbone.on('runFunItemEvent', function () {
                //$('#viewer').contents().find('html').html($('#editor').val());
                var iframe = document.getElementById('viewer');
                var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                iframeDocument.open();
                iframeDocument.write(self.editor.getValue());
                iframeDocument.close();
            });

            Backbone.on('updateFunItemEvent', function() {
                self.model.set({'funContent': self.editor.getValue() })
                self.model.save(null, {
                    success: function (model, response) {
                        Backbone.trigger('notificationEvent', 'Fun item updated successfully');
                    },
                    error: function (error) {
                    }
                });
            });

            Backbone.on('openConfirmModalEvent', function() {
                require(['views/components/confirmModal/ConfirmModalView', 'views/components/confirmModal/ConfirmModalModel'], function(ConfirmModalView, ConfirmModalModel) {
                    var confirmModalView = Vm.create('confirmModalView', ConfirmModalView, {model: new ConfirmModalModel}, true).setElement($('#confirm-modal'));
                    confirmModalView.model.set({name: self.model.toJSON().name, folder: self.model.toJSON().folder});

                });
            });

            Backbone.on('deleteFunItemEvent', function() {
                self.model.destroy({
                    success: function(model, response) {
                        Backbone.trigger('navigateEvent', '/');
                        Backbone.trigger('notificationEvent', 'Fun item deleted successfully');
                    },
                    error: function (error) {
                    }
                });
            });

            Backbone.on('changeViewModeEvent', function() {
                if($('#main-space').css('flex-direction') === 'column') {
                    $('#main-space').css('flex-direction', 'row');
                    $('#viewer').css('height', '100%').css('width', '50%');
                    self.editor.setSize("50%", "100%");

                } else {
                    $('#main-space').css('flex-direction', 'column');
                    $('#viewer').css('height', '50%').css('width', '100%');
                    self.editor.setSize("100%", "50%");

                }

                Resizer.initResizer($('#dragbar'), self.editor, $('#viewer'), $('#main-space').css('flex-direction'));
            });

        },

        render: function () {
            var self = this;
            $(self.el).html(funItemDetailTemplate);

            self.editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
                lineNumbers: true,
                mode: "htmlmixed",
                theme: "twilight"
            });
            self.editor.setSize("100%", "50%");
            self.editor.setValue(self.model.toJSON().funContent);

            Resizer.initResizer($('#dragbar'), self.editor, $('#viewer'), $('#main-space').css('flex-direction'));

            Backbone.trigger('runFunItemEvent');
        }

    });

    return FunItemDetailView;
});