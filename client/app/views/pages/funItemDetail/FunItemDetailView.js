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
            self.defaultViewMode = 'raw';

            self.listenTo(self.model, 'sync', self.render);
            
            Backbone.on('runFunItemEvent', function () {
                //$('#viewer').contents().find('html').html($('#editor').val());
                var iframe = document.getElementById('viewer');
                var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                iframeDocument.open();
                iframeDocument.write(self.editor.getValue());
                iframeDocument.close();
            });

            Backbone.on('createFunItemEvent', function(folder, name, modal) {
                $.post("/apis/funlist/", {
                    folder: folder,
                    name: name
                }).done(function(data, textStatus, jqXHR){
                    modal.close()
                    Backbone.trigger('notificationEvent', 'Fun item created successfully');
                    Backbone.trigger('selectFunItemEvent', data.path);
                }).fail(function(jqXHR, textStatus, errorThrown){
                    modal.showErrMsg(jqXHR.responseText);
                });
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
                if(self.defaultViewMode === 'column') {
                    $('#main-space').css('flex-direction', 'row');
                    $('#viewer').css('height', '100%').css('width', '50%');
                    self.editor.setSize("50%", "100%");
                    self.defaultViewMode = 'raw';

                } else {
                    $('#main-space').css('flex-direction', 'column');
                    $('#viewer').css('height', '50%').css('width', '100%');
                    self.editor.setSize("100%", "50%");
                    self.defaultViewMode = 'column';
                }

                Resizer.initResizer($('#dragbar'), self.editor, $('#viewer'), $('#main-space').css('flex-direction'));
            });

        },

        render: function () {
            var self = this;

            $(self.el).html(funItemDetailTemplate);

            $('#main-space').css('flex-direction', self.defaultViewMode);

            self.editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
                lineNumbers: true,
                mode: "htmlmixed",
                theme: "twilight"
            });
            self.editor.setSize("50%", "100%");
            
            Resizer.initResizer($('#dragbar'), self.editor, $('#viewer'), $('#main-space').css('flex-direction'));

            self.editor.setValue(self.model.toJSON().funContent);
            Backbone.trigger('runFunItemEvent');
        }

    });

    return FunItemDetailView;
});