define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    var cachedViews = {};

    var create = function (key, View, options, useCachedView) {
        
        if(key in cachedViews) {
            if(useCachedView) return cachedViews[key];

            if('dispose' in cachedViews[key]) {
                cachedViews[key].dispose();
            } else {
                throw 'should define a `dispose` method in none cache mode'
            }
        } 
        
        var view = new View(options);
        cachedViews[key] = view;

        return view;
    };
    
    return {
        create: create
    };
});