define([
    'backbone',
    'underscore',
    'text!views/components/notification/notification.html'
], function(Backbone, _, notificationTemplate){
    var NotificationView =  Backbone.View.extend({
        template: _.template(notificationTemplate),

        initialize: function () {
            var self = this;

            Backbone.on('notificationEvent', function(msg){
                var notificationDiv = self.template({ message: msg });
                
                $(self.el).append(notificationDiv);

				var timer = setTimeout(function(){
					$(self.el).children(':first-child').remove();
                    clearTimeout(timer);
				}, 3000)
            })
        }
    });

    return NotificationView;
});