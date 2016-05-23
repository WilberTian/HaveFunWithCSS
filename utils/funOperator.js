var fs = require('fs');
var Q = require('q');
var path = require('path');

var funItemPath = './public/sources'

module.exports = {
	getFunList: function() {
		var deferred = Q.defer();
	  	fs.readdir(funItemPath, function(err, itemList) {
	  	
		  	if(!err) {
		  		var funList = [];
		  		var other = {};
		  		other['folder'] = 'other';
		  		other['itemList'] = [];

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

		  			} else {
		  				other['itemList'].push({
		  					'path': path.join('other', item),
		  					'name': item
		  				});
		  			}
		  		})

		  		funList.push(other)
		  		deferred.resolve(funList);
		  	} else {
		  		deferred.reject(err);
		  	}
	  	})

	  	return deferred.promise
	},

	getFunItem: function(folder, name) {
		var pathName = path.join(folder, name);
		if(folder === 'other') {
			pathName = name;
		}
		var itemPath = path.join(funItemPath, pathName);

		var deferred = Q.defer();
		fs.readFile(itemPath, function(err, itemContent) {
			if(!err) {
				deferred.resolve(itemContent);
			} else {
				deferred.reject(err);
			}
		})

		return deferred.promise;
	},

	addFunItem: function(folder, name, content) {

	},

	updateFunItem: function(folder, name, content) {
		var pathName = path.join(folder, name);
		if(folder === 'other') {
			pathName = name;
		}

		var itemPath = path.join(funItemPath, pathName);

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
		var itemPath = path.join(funItemPath, name);

		var deferred = Q.defer();
		fs.unlink(itemPath, function(err) {
			
		})

		return deferred.promise;
	},

	isFunItemExist: function(folder, name) {
		var itemPath = path.join(funItemPath, name);

		var deferred = Q.defer();
		fs.exists(itemPath, function(err) {
			
		})

		return deferred.promise;
	}
}


