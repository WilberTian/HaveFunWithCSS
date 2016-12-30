define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    var cachedViews = {};

    var create = function (key, View, options, useCachedView) {
        if(key in cachedViews) {
            if(useCachedView) return cachedViews[key];

            cachedViews[key].undelegateEvents();
            cachedViews[key].remove();
        } 

        var view = new View(options);
        cachedViews[key] = view;

        return view;
    };
    
    return {
        create: create
    };
});