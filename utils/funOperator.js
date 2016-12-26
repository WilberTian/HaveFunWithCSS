var fs = require('fs');
var Q = require('q');
var path = require('path');

var funItemPath = './public/sources/'

module.exports = {
	getFunList: function() {
		var deferred = Q.defer();
	  	fs.readdir(funItemPath, function(err, itemList) {
		  	if(!err) {
		  		var funList = [];
		  		
		  		itemList.forEach(function(item) {
					var funGroup = {
						'folder': item,
						'count': 0,
						'funItems': []
					}
					
		  			var itemPath = path.join(funItemPath, item);
		  			if(fs.statSync(itemPath).isDirectory()) {
		  				
		  				var files = fs.readdirSync(itemPath);

		  				for(var f in files) {

							funGroup['count'] += 1;  
							funGroup['funItems'].push({
		  						'path': path.join(item, files[f]),
		  						'name': files[f]
		  					});
		  				}
		  				
		  			} 

					funList.push(funGroup);
		  		})

		  		deferred.resolve(funList);
		  	} else {
		  		deferred.reject(new Error('Fail to get fun list'));
		  	}
	  	})

	  	return deferred.promise
	},

	addFunItem: function(folder, name) {
		var folderPath = path.join(funItemPath, folder);
		var itemPath = path.join(funItemPath, folder, name);

		var deferred = Q.defer();

		fs.access(folderPath, function(err){
			if(!folder || (path.normalize(funItemPath) === path.normalize(folderPath))){
				deferred.reject(new Error('Invalid folder name'));
				return;
			}

			if(!name){
				deferred.reject(new Error('Invalid file name'));
				return;
			}

			if(err) {
				fs.mkdir(folderPath, function(err) {
					if(err) {
						deferred.reject(new Error('Fail to create folder'));
					} else {
						fs.writeFile(path.join(folderPath, name), '', function(err){
							if(!err) {
								deferred.resolve({
									name: name,
									folder: folder,
									path: path.join(folder, name)
								})
							} else {
								fs.rmdirSync(folderPath);
								deferred.reject(new Error('Fail to create fun item'));
							}
						})
					}
				})

			} else {
				fs.access(itemPath, function(err) {
					if(err) {
						fs.writeFile(path.join(folderPath, name), '', function(err){
							if(!err) {
								deferred.resolve({
									name: name,
									folder: folder,
									path: path.join(folder, name)
								})
							} else {
								deferred.reject(new Error('Fail to create fun item'));
							}
						})
					} else {
						deferred.reject(new Error(name + '@' + folder + ' already exists'))
					}
				})		
			}
		})
		

		return deferred.promise;
	},

	getFunItemsByFolder: function(folder) {
		var funItemFolderPath = path.join(funItemPath, folder);

		var deferred = Q.defer();
	  	fs.readdir(funItemFolderPath, function(err, itemList) {
		  	if(!err) {
		  		var funItemsByFolder = [];
		  		
		  		itemList.forEach(function(item) {
					funItemsByFolder.push({
						name: item,
						path: path.join(folder, item)
					});
		  		})

		  		deferred.resolve(funItemsByFolder);
		  	} else {
		  		deferred.reject(new Error('Fail to get fun list'));
		  	}
	  	})

	  	return deferred.promise
	},

	getFunItem: function(folder, name) {
		var itemPath = path.join(funItemPath, folder, name);

		var deferred = Q.defer();
		fs.readFile(itemPath, function(err, itemContent) {
			if(!err) {
				deferred.resolve({
					'path': path.join(folder, name),
					'name': name,
					'folder': folder,
					'funContent': itemContent.toString()
				})
				deferred.resolve();
			} else {
				deferred.reject(new Error('Fail to read fun item'));
			}
		})

		return deferred.promise;
	},

	updateFunItem: function(folder, name, content) {
		var itemPath = path.join(funItemPath, folder, name);

		var deferred = Q.defer();
		fs.writeFile(itemPath, content, function(err) {
			if(!err) {
				deferred.resolve({
					'path': path.join(folder, name),
					'name': name,
					'folder': folder,
					'funContent': content
				});
			} else {
				deferred.reject(new Error('Fail to update fun item'));
			}
		})

		return deferred.promise;
	},

	removeFunItem: function(folder, name) {
		var folderPath = path.join(funItemPath, folder);
		var itemPath = path.join(funItemPath, folder, name);

		var deferred = Q.defer();
		fs.unlink(itemPath, function(err) {
			if(!err) {
				var files = fs.readdirSync(folderPath);
				if(files.length === 0) {
					fs.rmdirSync(folderPath)
				}

				deferred.resolve({
					'path': path.join(folder, name),
					'name': name,
					'folder': folder
				});
			} else {
				deferred.reject(new Error('Fail to delete fun item'));
			}
		})

		return deferred.promise;
	},

	removeFunFolder: function(folder) {
		var folderPath = path.join(funItemPath, folder);

		var deferred = Q.defer();
		fs.rmdir(folderPath, function(err) {
			if(!err) {
				deferred.resolve(folder + ' folder was deleted');
			} else {
				deferred.reject(new Error('Fail to remove folder'));
			}
		})

		return deferred.promise;
	}
}


