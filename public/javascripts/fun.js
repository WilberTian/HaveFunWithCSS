$(function(){
	/*
		Model
	*/
	var FunItem = Backbone.Model.extend({
		urlRoot: '/apis',
		url: function(){
			return this.urlRoot + '/' + this.get('folder') + '/' + this.get('name')
		},

		idAttribute: 'path'
	});

	var FunItemList = Backbone.Collection.extend({
		url: '/apis/funlist/',
		
		model: FunItem,

		initialize: function(){
		    this.fetch({
		    	success: function (model, response) {
			        Backbone.trigger('notificationEvent', 'Fun list fetched successfully');
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
	      	this.$el.html(this.template(this.model.toJSON()));
	      	return this;
	    },

	    events: {
	      	'click .fun-group-item span': 'selectFunItem'
	    },

	    selectFunItem: function() {
	    	Backbone.trigger('selectFunItemEvent', this)
    		this.model.fetch({
		    	success: function (model, response) {
		    		Backbone.trigger('notificationEvent', 'Fun content fetched successfully')
			        Backbone.trigger('funContentLoadedEvent', response.funContent)
			    },
			    error: function (error) {
			    }
		    })
	 	
	    }

	});


	var AppView = Backbone.View.extend({
		el: $('#app-container'),

		funModalTemplate: _.template($('#fun-item-modal-template').html()),
		funGroupTemplate: _.template($('#fun-group-template').html()),
		notificationTemplate: _.template($('#notification-template').html()),
		funItemOperationsTemplate: _.template($('#fun-item-operations-template').html()),
		confirmModalTemplate: _.template($('#confirm-modal-template').html()),

		initialize: function() {
			var self = this;

			self.funGroups = {}
			self.selectedFunItem = null;
			
			self.listenTo(funItemList, 'add', self.insertFunItem);
			self.listenTo(funItemList, 'remove', self.removeFunItem);
			self.listenTo(funItemList, 'all', self.render);

			Backbone.on('selectFunItemEvent', function(ele) {
				if(self.selectedFunItem !== null) {
					$(self.selectedFunItem.$el).removeClass('active-fun-item')
					self.selectedFunItem = ele;
					$(self.selectedFunItem.$el).addClass('active-fun-item')

					var selectedFunItemModel = self.selectedFunItem.model.toJSON();
					var funItemOperationsDiv = self.funItemOperationsTemplate({folder: selectedFunItemModel.folder, name: selectedFunItemModel.name});
					$('#fun-item-operations').html(funItemOperationsDiv);

				} else {
					self.selectedFunItem = ele;
					$(self.selectedFunItem.$el).addClass('active-fun-item')

					var selectedFunItemModel = self.selectedFunItem.model.toJSON();
					var funItemOperationsDiv = self.funItemOperationsTemplate({folder: selectedFunItemModel.folder, name: selectedFunItemModel.name});
					$('#fun-item-operations').html(funItemOperationsDiv);
				}
			})

			Backbone.on('notificationEvent', function(message) {
				var notificationDiv = self.notificationTemplate({ message: message });
				$('#notification-area').append(notificationDiv);
				setTimeout(function(){
					$('#notification-area').children(':first-child').remove();
				}, 3000)

			})

			Backbone.on('funContentLoadedEvent', function(funContent) {
				editor.setValue(funContent);
				self.tryIt();
			})

		},

		events: {
			
			'click #open-modal-btn': 'openFunItemModal',
			'click #create-fun-item-btn': 'createFunItem',
			'click #close-modal-btn': 'closeFunItemModal',
			'click #delete-fun-item-btn': 'clickDeleteFunItem',
			'click #close-confirm-modal-btn': 'closeConfirmModal',

			'click #fun-item-operations .try-it': 'tryIt',
			'click #fun-item-operations .delete': 'openConfirmModal',
			'click #fun-item-operations .edit': 'editFunItem',
	      	'click #fun-item-operations .update': 'updateFunItem'
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

		removeFunItem: function(funItem) {
			var self = this;

	    	funItem.destroy({
	    		wait: true,
			    success: function (model, response) {
					self.closeConfirmModal();
			        Backbone.trigger('notificationEvent', 'Fun item deleted successfully');
			    },
			    error: function (error) {
			    	console.log(error)
			    }
			})
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
			        Backbone.trigger('notificationEvent', 'Fun item created successfully');
			    },
			    error: function (model, error) {
			    	console.log(error)
			    	$('#error-msg').html(error.responseText);
			    }
			})
		},

		clickDeleteFunItem: function() {
			funItemList.remove(this.selectedFunItem.model);
		},

		tryIt: function() {
		    //$('#viewer').contents().find('html').html($('#editor').val());
		    var iframe = document.getElementById('viewer');
		    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
		    iframeDocument.open();
		    iframeDocument.write(editor.getValue());
		    iframeDocument.close();
		},

		openFunItemModal: function() {
			$('#fun-item-modal').html(this.funModalTemplate());
			$('#fun-item-modal').show();
		}, 

		closeFunItemModal: function() {
			$('#fun-item-modal').html();
			$('#fun-item-modal').hide();
		},

		closeConfirmModal: function() {
			$('#confirm-modal').html();
			$('#confirm-modal').hide();
		},

		openConfirmModal: function() {
			var selectedFunItem = this.selectedFunItem.model.toJSON();
			$('#confirm-modal').html(this.confirmModalTemplate({ name: selectedFunItem.name + '@' + selectedFunItem.folder }));
			$('#confirm-modal').show();
		},

	    editFunItem: function(){
	    	editor.setOption('readOnly', false);
	    },

	    updateFunItem: function() {
	    	this.selectedFunItem.model.set({'funContent': editor.getValue() })
	    	this.selectedFunItem.model.save(null, {
			    success: function (model, response) {
			        Backbone.trigger('notificationEvent', 'Fun item updated successfully');
					editor.setOption('readOnly', 'nocursor');
			    },
			    error: function (error) {
			    }
			});
	    }


	});

	var App = new AppView();

});