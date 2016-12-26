$(function(){
	/*
		Model
	*/
	var FunItem = Backbone.Model.extend({
		urlRoot: '/apis',
		url: function(){
			return this.urlRoot + '/' + this.get('path').replace('\\', '/');
		},

		idAttribute: 'path'
	});

	var FunItems = Backbone.Collection.extend({
		model: FunItem
	});

	var FunGroup = Backbone.Model.extend({
		initialize: function(data) {
			this.funItems = new FunItems(data.funItems);
		}
	});

	var FunGroups = Backbone.Collection.extend({
		url: '/apis/funlist/',
		
		model: FunGroup,

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

	funGroups = new FunGroups();




	/*
		View
	*/
	var FunItemView = Backbone.View.extend({
	
		template: _.template($('#fun-item-template').html()),
		

		initialize: function() {
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
	    	var url = window.encodeURI('detail/' + this.model.toJSON()['path'].replace('\\', '/'));
			router.navigate(url, {  
				trigger: true  
			});	 	
	    }

	});

	var FunGroupView = Backbone.View.extend({
	
		template: _.template($('#fun-group-template').html()),
		

		initialize: function() {
			var self = this;

			self.listenTo(self.model.funItems, 'add', self.addFunItem);

			Backbone.on('searchFunItemEvent', function(key) { 
				if(self.model.get('folder').indexOf(key) > -1) {
					self.$el.show();
				} else {
					self.$el.hide();
				}
			});
		},

		addFunItem: function(funItem) {
			var funItemView = new FunItemView({model: funItem});
			this.$el.find('.description').append(funItemView.render().el);
		},

		render: function() {
			var self = this;

	      	self.setElement(self.template({
				folder: self.model.toJSON().folder,
				funItemNum: self.model.toJSON().count
			}));
		
			self.model.funItems.forEach(function(funItem) {
				var funItemView = new FunItemView({model: funItem});
				self.$el.find('.description').append(funItemView.render().el);
			});

	      	return self;
	    },

		toggleDisplay: function() {

		}

	});

	var FunItemSelectorView = Backbone.View.extend({
		template: _.template($('#fun-item-selector-template').html()),

		render: function() {
			this.$el.html(this.template(this.model));
	      	return this;
		}

	});

	var AppView = Backbone.View.extend({
		el: $('#app-container'),

		funModalTemplate: _.template($('#fun-item-modal-template').html()),
		funGroupTemplate: _.template($('#fun-group-template').html()),
		notificationTemplate: _.template($('#notification-template').html()),
		confirmModalTemplate: _.template($('#confirm-modal-template').html()),

		initialize: function() {
			var self = this;

			self.selectedFunItem = null;
			self.selectedFunItmeFolder = '';
			
			self.listenTo(funGroups, 'add', self.insertFunGroup);
			self.listenTo(funGroups, 'all', self.render);

			self.init = false;

			Backbone.on('selectFunItemEvent', function(selectedFunItemInfo) {

				var selectedFunGroup = funGroups.where({folder: selectedFunItemInfo.folder})[0];
				var funItemNames = [];
				
				if(!self.init) {
					self.init = true;
					selectedFunGroup.funItems.models.forEach(function(model){
						funItemNames.push({
							path: model.get('path'),
							name: model.get('name')
						});
					});

					var funItemSelectorView = new FunItemSelectorView({model:{name: selectedFunItemInfo.name, folder: selectedFunItemInfo.folder, funItems: funItemNames}})					
					$('#fun-item-selector').html(funItemSelectorView.render().$el.children());
					$('.ui.selection.dropdown').dropdown();

					
				}
				

				self.selectedFunItmeFolder = selectedFunItemInfo.folder;
				self.selectedFunItem = selectedFunGroup.funItems.where({name: selectedFunItemInfo.name})[0];
				
				Backbone.trigger('fetchFunItemDataEvent', self.selectedFunItem);
			})

			Backbone.on('fetchFunItemDataEvent', function(funItemModel){
				funItemModel.fetch({
					success: function (model, response) {
						Backbone.trigger('notificationEvent', 'Fun content fetched successfully')
						Backbone.trigger('funContentLoadedEvent', response.funContent)
					},
					error: function (error) {
					}
				})
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
	      	'click #fun-item-operations .update': 'updateFunItem',
			'keyup #fun-filter': 'searchFunItem',
			'change #selectedFunItemName': 'changeFunItem'
		},
		
		insertFunGroup: function(funGroup) {

			var funGroupView = new FunGroupView({model: funGroup});
			this.$('#fun-group-list').append(funGroupView.render().el);

		},

		render: function() {

		},

		createFunItem: function() {	
			var self = this;
			var folder = $('#fun-folder-in-modal').val();
			var name = $('#fun-name-in-modal').val();

			var funGroup = funGroups.where({folder: folder})[0];

			if(funGroup === undefined) {
				funGroup = new FunGroup({count: 1, folder: folder, funItems:[]});
				funGroups.add(funGroup);
			}

			funGroup.funItems.create({folder: folder, name: name }, {
				url: '/apis/funlist',
				wait: true,
			    success: function (model, response) {
			        self.closeFunItemModal();
			        Backbone.trigger('notificationEvent', 'Fun item created successfully');
			    },
			    error: function (model, error) {
			    	console.log(error)
			    	$('#error-msg p').html(error.responseText);
					$('#error-msg').show();
			    }
			})
		},

		clickDeleteFunItem: function() {
			this.selectedFunItem.destroy({success: function(model, response) {
				router.navigate('/', {  
					trigger: true  
				}); 

				Backbone.trigger('notificationEvent', 'Fun item deleted successfully');
			}});
			
		},

		tryIt: function() {
		    //$('#viewer').contents().find('html').html($('#editor').val());
		    var iframe = document.getElementById('viewer');
		    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
		    iframeDocument.open();
		    iframeDocument.write(editor.getValue());
		    iframeDocument.close();
		},

		openFunItemModal: function(e) {
			var funFolder = $(e.currentTarget).data('funfolder');
			$('#fun-item-modal').html(this.funModalTemplate({funFolder: funFolder}));
			$('#fun-item-modal')
				.modal({ detachable: false })
				.modal('setting', 'closable', false)
				.modal('show');
		}, 

		closeFunItemModal: function() {
			$('#fun-item-modal')
				.modal('hide');
		},

		closeConfirmModal: function() {
			$('#confirm-modal')
				.modal('hide');
		},

		openConfirmModal: function() {
			var selectedFunItem = this.selectedFunItem.toJSON();
			$('#confirm-modal').html(this.confirmModalTemplate({ name: selectedFunItem.name + '@' + selectedFunItem.folder }));
			$('#confirm-modal')
				.modal({ detachable: false })
				.modal('setting', 'closable', false)
				.modal('show');
		},

	    editFunItem: function(){
	    	editor.setOption('readOnly', false);
	    },

	    updateFunItem: function() {
	    	this.selectedFunItem.set({'funContent': editor.getValue() })
	    	this.selectedFunItem.save(null, {
			    success: function (model, response) {
			        Backbone.trigger('notificationEvent', 'Fun item updated successfully');
					editor.setOption('readOnly', 'nocursor');
			    },
			    error: function (error) {
			    }
			});
	    },

		searchFunItem: function(e) {
			Backbone.trigger('searchFunItemEvent', e.target.value);
		},

		changeFunItem: function(e) {
			var url = window.encodeURI('detail/' + e.target.value.replace('\\', '/'));
			router.navigate(url, {  
				trigger: true  
			});
		}


	});

	var AppRouter = Backbone.Router.extend({  
		routes : {  
			'' : 'index',  
			'detail/:folder/:name' : 'showDetail'
		},  
		index : function() {  
			var App = new AppView();
			$('#fun-group-list').show();
			$('#main-space').hide();

			$('#index-menu').show();
			$('#fun-item-selector').hide();
			$('#fun-item-operations').hide();
		},  
		showDetail : function(folder, name) {
			$('#fun-group-list').hide();
			$('#main-space').show();

			$('#index-menu').hide();
			$('#fun-item-selector').show();
			$('#fun-item-operations').show();

			resizer.fixDragBtn();

			Backbone.trigger('selectFunItemEvent', {folder: folder, name: name});
		}
	});  
	
	var router = new AppRouter();  
	Backbone.history.start();  

});