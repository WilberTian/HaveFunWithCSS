$(function(){
	/*
		Model
	*/
	var FunItem = Backbone.Model.extend({
		urlRoot: '/apis',

		url: function(){
			return this.urlRoot + '/' + this.get('folder') + '/' + this.get('name')
		},

		idAttribute: 'path',
	});

	var FunItemList = Backbone.Collection.extend({
		url: '/apis/funlist/',
		model: FunItem,

		parse: function(response) {
			return response.funList;
		},

		initialize: function(){
		    this.fetch();
		}
	});

	var funItemList = new FunItemList();



	/*
		View
	*/
	var FunItemView = Backbone.View.extend({
	
		template: _.template($('#fun-item-template').html()),

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			
		},

		render: function() {
			//console.log(this.model.toJSON())
	      	this.$el.html(this.template(this.model.toJSON()));
	      	return this;
	    },

	    events: {
	      	'click .fun-group-item span'   : 'selectFunItem',
	      	'click .fun-group-item .edit': 'editFunItem',
	      	'click .fun-group-item .update': 'updateFunItem',
	      	'click .fun-group-item .delete': 'deleteFunItem'
	    },

	    selectFunItem: function() {
	    	Backbone.trigger('selectFunItemEvent', this.$el)
    		this.model.fetch().then(function(data){
    			Backbone.trigger('funContentLoadedEvent', data.funContent)
    			//console.log(data.funContent)
	    	}.bind(this))
	 		
	    	
	    },

	    editFunItem: function(){

	    },

	    updateFunItem: function() {
	    	this.model.set({'funContent': $('#editor').val() })
	    	this.model.save(null, {
			    success: function (model, response) {
			        
			    },
			    error: function (error) {
			    }
			});
	    },

	    deleteFunItem: function(){
	    	var funGroupElement = this.$el.parent();
	    	this.model.destroy({
			    success: function (model, response) {
			  		if(funGroupElement.find('.fun-group-item').length === 0) {
			  			funGroupElement.remove();
			  		}
			        //console.log(response)
			    },
			    error: function (error) {
			    	console.log(error)
			    }
			})
	    },


	});


	var AppView = Backbone.View.extend({
		el: $('#app-container'),

		funModalTemplate: _.template($('#fun-item-modal-template').html()),
		funGroupTemplate: _.template($('#fun-group-template').html()),

		initialize: function() {
			this.funGroups = {}
			this.selectedFunItem = null;
			
			this.listenTo(funItemList, 'add', this.insertFunItem);
			this.listenTo(funItemList, 'all', this.render);

			Backbone.on('selectFunItemEvent', function(ele) {
				if(this.selectedFunItem !== null) {
					$(this.selectedFunItem).removeClass('active-fun-item')
					this.selectedFunItem = ele;
					$(this.selectedFunItem).addClass('active-fun-item')
				} else {
					this.selectedFunItem = ele;
					$(this.selectedFunItem).addClass('active-fun-item')
				}
			}.bind(this))

			Backbone.on('funContentLoadedEvent', function(funContent) {
				$('#editor').val(funContent);
				this.tryIt();
			}.bind(this))

		},

		events: {
			'click #try-it': 'tryIt',
			'click #open-fun-item-modal': 'openFunItemModal',
			'click #createFunItem': 'createFunItem',
			'click #closeFunItemModel': 'closeFunItemModal',
		},

		insertFunItem: function(funItem) {
			var folder = funItem.toJSON().folder;

			var view = new FunItemView({model: funItem})

			if(!(folder in this.funGroups)) {
				this.funGroups[folder] = _.uniqueId('funGroup_')
				var funGroupDiv = this.funGroupTemplate({folder: folder, folderId: this.funGroups[folder] })
				this.$('#fun-group-list').append(funGroupDiv);
			}
				
			this.$('#fun-group-list').children('#' + this.funGroups[folder]).append(view.render().el);
		},

		render: function() {

		},

		createFunItem: function() {	
			var self = this;

			funItemList.create({folder: $('#funFolderInModal').val(), name: $('#funItemInModal').val()}, {
				url: '/apis/funlist',
				wait: true,
			    success: function (model, response) {
			        self.closeFunItemModal();
			    },
			    error: function (model, error) {
			    	console.log(error)
			    	$('#error-msg').html(error.responseText);
			    }
			})
		},

		tryIt: function() {
		    $('#viewer').contents().find('html').html($('#editor').val());
		},

		openFunItemModal: function() {
			$('#fun-item-modal').html(this.funModalTemplate());
			$('#fun-item-modal').show();
		}, 

		closeFunItemModal: function() {
			$('#fun-item-modal').html();
			$('#fun-item-modal').hide();
		}


	});

	var App = new AppView();

});