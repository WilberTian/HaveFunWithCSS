define([
    'backbone',
    'underscore',
    'text!views/pages/funItemDetail/funItemDetail.html',
    'codemirror'
], function(Backbone, _, funItemDetailTemplate, CodeMirror){
    var FunItemDetailView =  Backbone.View.extend({
        el: $('#app-content'),

        template: _.template(funItemDetailTemplate),

        initialize: function() {
            
        },

        render: function () {
            var self = this;
            $(self.el).html(funItemDetailTemplate);

            var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
                lineNumbers: true,
                mode: "htmlmixed",
                theme: "twilight"
            });
            editor.setSize("100%", "50%")
        }

    });

    return FunItemDetailView;
});