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
		  			var itemPath = path.join(funItemPath, item);
		  			if(fs.statSync(itemPath).isDirectory()) {
		  				var temp = {};
		  				temp['folder'] = item;
		  				temp['itemList'] = [];
		  				var files = fs.readdirSync(itemPath);

		  				for(var f in files) {
		  					temp['itemList'].push({
		  						'path': path.join(item, files[f]),
		  						'name': files[f]
		  					})
		  				}
		  				funList.push(temp)
		  			} 
		  		})

		  		deferred.resolve(funList);
		  	} else {
		  		deferred.reject(err);
		  	}
	  	})

	  	return deferred.promise
	},

	getFunItem: function(folder, name) {
		var itemPath = path.join(funItemPath, folder, name);

		var deferred = Q.defer();
		fs.readFile(itemPath, function(err, itemContent) {
			if(!err) {
				deferred.resolve(itemContent.toString());
			} else {
				deferred.reject(err);
			}
		})

		return deferred.promise;
	},

	addFunItem: function(folder, name) {
		var folderPath = path.join(funItemPath, folder);
		var itemPath = path.join(funItemPath, folder, name);

		var deferred = Q.defer();

		if(!folder || (path.normalize(funItemPath) === folderPath)){
			deferred.reject('invalid folder name');
		}

		if(!name || (folderPath === itemPath)){
			deferred.reject('invalid file name');
		}
		
		fs.access(folderPath, function(err){
			if(err) {
				fs.mkdir(folderPath, function(err) {
					if(err) {
						deferred.reject(err);
					}
				})
			}
			
			fs.access(itemPath, function(err) {
				if(err) {
					fs.writeFile(path.join(folderPath, name), '', function(err){
						if(!err) {
							deferred.resolve(name + '@' + folder + ' was created')
						} else {
							deferred.reject(err);
						}
					})
				} else {
					deferred.reject(name + '@' + folder + ' already exists')
				}
			})		
		})

		return deferred.promise;
	},

	updateFunItem: function(folder, name, content) {
		var itemPath = path.join(funItemPath, folder, name);

		var deferred = Q.defer();
		fs.writeFile(itemPath, content, function(err) {
			if(!err) {
				deferred.resolve(content);
			} else {
				deferred.reject(err);
			}
		})

		return deferred.promise;
	},

	removeFunItem: function(folder, name) {
		var itemPath = path.join(funItemPath, folder, name);

		var deferred = Q.defer();
		fs.unlink(itemPath, function(err) {
			if(!err) {
				deferred.resolve(name + '@' + folder + ' was deleted');
			} else {
				deferred.reject(err);
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
				deferred.reject(err);
			}
		})

		return deferred.promise;
	}
}


