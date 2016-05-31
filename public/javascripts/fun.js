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

		initialize: function(){
		    this.fetch({
		    	success: function (model, response) {
			        // Fun list fetched successfully
			    },
			    error: function (error) {
			    }
		    });
		}
	});

	var funItemList = new FunItemList();




	/*
		View
	*/
	var FunItemView = Backbone.View.extend({
	
		template: _.template($('#fun-item-template').html()),

		initialize: function() {
			this.listenTo(this.model, 'add', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function() {
			//console.log(this.model.toJSON())
	      	this.$el.html(this.template(this.model.toJSON()));
	      	return this;
	    },

	    events: {
	      	'click .fun-group-item span': 'selectFunItem',
	      	'click .fun-group-item .edit': 'editFunItem',
	      	'click .fun-group-item .update': 'updateFunItem',
	      	'click .fun-group-item .delete': 'deleteFunItem'
	    },

	    selectFunItem: function() {
	    	Backbone.trigger('selectFunItemEvent', this.$el)
    		this.model.fetch({
		    	success: function (model, response) {
		    		// Fun content fetched successfully
			        Backbone.trigger('funContentLoadedEvent', response.funContent)
			    },
			    error: function (error) {
			    }
		    })
	 	
	    },

	    editFunItem: function(){
	    	$('#editor').prop('disabled', false);
	    	$('#editor').addClass('edit-mode');
	    },

	    updateFunItem: function() {
	    	this.model.set({'funContent': $('#editor').val() })
	    	this.model.save(null, {
			    success: function (model, response) {
			        // Fun item updated successfully
			        $('#editor').prop('disabled', true);
	    			$('#editor').removeClass('edit-mode');
			    },
			    error: function (error) {
			    }
			});
	    },

	    deleteFunItem: function(){
	    	console.log('delete was called')
	    	var funGroupElement = this.$el.parent();
	    	this.model.destroy({
	    		wait: true,
			    success: function (model, response) {
			  		if(funGroupElement.find('.fun-group-item').length === 0) {
			  			funGroupElement.remove();
			  		}
			        //console.log(response)
			        // Fun item deleted successfully
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
					$(this.selectedFunItem).find('.fun-group-item-operations').hide();
					this.selectedFunItem = ele;
					$(this.selectedFunItem).addClass('active-fun-item')
					$(this.selectedFunItem).find('.fun-group-item-operations').show();
				} else {
					this.selectedFunItem = ele;
					$(this.selectedFunItem).addClass('active-fun-item')
					$(this.selectedFunItem).find('.fun-group-item-operations').show();
				}
			}.bind(this))

			Backbone.on('funContentLoadedEvent', function(funContent) {
				$('#editor').val(funContent);
				this.tryIt();
			}.bind(this))

		},

		events: {
			'click #try-it': 'tryIt',
			'click #open-modal-btn': 'openFunItemModal',
			'click #create-fun-item-btn': 'createFunItem',
			'click #close-modal-btn': 'closeFunItemModal',
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
			var folder = $('#fun-folder-in-modal').val();
			var name = $('#fun-name-in-modal').val();

			funItemList.create({folder: folder, name: name }, {
				url: '/apis/funlist',
				wait: true,
			    success: function (model, response) {
			        self.closeFunItemModal();
			        // Fun item created successfully
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