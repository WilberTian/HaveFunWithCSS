define([
    'backbone',
    'underscore',
    'text!views/components/notification/notification.html'
], function(Backbone, _, notificationTemplate){
    var NotificationView =  Backbone.View.extend({
        el: $('#notification-area'),

        template: _.template(notificationTemplate),

        initialize: function () {
            var self = this;

            Backbone.on('notificationEvent', function(msg){
                var notificationDiv = self.template({ message: msg });
                
                $(self.el).append(notificationDiv);

				setTimeout(function(){
					$(self.el).children(':first-child').remove();
				}, 3000)
            })
        }
    });

    return NotificationView;
});