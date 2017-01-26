(function(){
    
    var fs = require('fs');
    var Path = require('path');

    var Rx = require('rxjs/Rx');
    var _ = require('underscore');
    
    
    

    var fileStatAsObservable = (path) => Rx.Observable.create(function(observer) {
        
        var cb = (e, stats) => {
            if(e)  observer.error(e);
            
            observer.next({
                extension: Path.extname(path),
                name: Path.basename(path, this.extension),
                location: Path.dirname(path),
                path: path,
                stats: stats
            })
            observer.complete();
        };
        
        fs.stat(path, cb);
        
    });

    
    
    var readFileAsObservable = (path, encoding) => Rx.Observable.create(function(observer) {
        if(encoding === void(0)) encoding = 'utf-8';
        
        var cb = (e, data) => {
            if(e)  observer.error(e);

            observer.next(data);
            observer.complete();
        };
        
        fs.readFile(path, encoding, cb);
        
    });
    Rx.Observable.bindNodeCallback(fs.readFile);
    var writeFileAsObservable = (path, data) => Rx.Observable.create(function(observer) {
        var cb = (e) => {
            if(e)  observer.error(e);

            observer.next({
                path: path, 
                data: data
            });
            observer.complete();
        };
        
        fs.writeFile(path, data, cb);
        
    });
    var forceWriteFileAsObservable = (path, data) => forceMkdirAsObservable(Path.dirname(path))
                                                                                .ignoreElements()
                                                                                .concat(writeFileAsObservable(path, data));
    var rmFileAsObservable = (path) => Rx.Observable.create(function(observer) {
        var cb = (e) => {
            if(e)  observer.error(e);

            observer.next(path);
            observer.complete();
        };
        
        fs.unlink(path, cb);
    });

    


    var readDirAsObservable = (path) => Rx.Observable.create(function(observer) {
        var cb = (e, items) => {
            if(e)  observer.error(e);

            items = _.map(items, _.partial((a, b) => a + '/' + b, path));
            _.each(items, item => observer.next(item));
           
            observer.complete();
        };
        
        fs.readdir(path, cb);
        
    });
    var walkDirAsObservable = (path, depth) => {
        if(isNaN(depth)) depth = 0;
        
        var readDirWithStatsAsObservable = (path, _depth) => {
            return readDirAsObservable(path)
                            .mergeMap(path => fileStatAsObservable(path))
                            .mergeMap(fsObj => Rx.Observable.create(obs => {
                                                                                _.extend(fsObj, {depth: _depth + 1});
                                                                                obs.next(fsObj);
                                                                                obs.complete();
                                                                            }))
        }
        
        return readDirWithStatsAsObservable(path, 0)
                        .expand(
                            fsObj => (fsObj.stats.isDirectory() && fsObj.depth <= depth) ? readDirWithStatsAsObservable(fsObj.path, fsObj.depth) : Rx.Observable.empty()
                        );
    };
    var mkdirAsObservable = (path) => Rx.Observable.create(function(observer) {
        var cb = (e) => {
            if(e)  observer.error(e);
            
            observer.next(path);
            observer.complete();
        };
        
        fs.mkdir(path, cb);
    });
    var forceMkdirAsObservable = (path) => {
        var dirs = path.split('/');
        
        var source = (_path) => mkdirAsObservable(_path).catch(function(e){
            if(e.code === 'EEXIST') {
                return (path === _path) ? Rx.Observable.of(path) : Rx.Observable.empty();
            }
            
            return Rx.Observable.of(e);
        });


        return Rx.Observable.from(dirs)
                        .scan((a, b) => a + '/' + b)
                        .mergeMap(source, null, 1);
                        
    };
    var rmdirAsObservable = (path) => Rx.Observable.create(function(observer) {
        var cb = (e) => {
            if(e)  observer.error(e);
            
            observer.next(path);
            observer.complete();
        };
        
        fs.rmdir(path, cb);
    });
    var forceRmdirAsObservable = (path) => {

        var readDirWithStatsAsObservable = (path) => {
            return readDirAsObservable(path)
                            .mergeMap(path => fileStatAsObservable(path));
        }
        return readDirWithStatsAsObservable(path)
                        .mergeMap(fsObj => fsObj.stats.isDirectory() ? forceRmdirAsObservable(fsObj.path) : rmFileAsObservable(fsObj.path))
                        .concat(rmdirAsObservable(path));

    };

        
    
    
    var rxfs = {
        fileStatAsObservable: fileStatAsObservable,
        
        readFileAsObservable: readFileAsObservable,
        writeFileAsObservable: writeFileAsObservable,
        forceWriteFileAsObservable: forceWriteFileAsObservable,
        rmFileAsObservable: rmFileAsObservable,
        
        readDirAsObservable: readDirAsObservable,
        walkDirAsObservable: walkDirAsObservable,
        mkdirAsObservable: mkdirAsObservable,
        forceMkdirAsObservable: forceMkdirAsObservable,
        rmdirAsObservable: rmdirAsObservable,
        forceRmdirAsObservable: forceRmdirAsObservable
    };
    
    if(typeof module !== 'undefined' && module.exports) {
        module.exports = rxfs;
    }
    // amd require
    else if(typeof define !== 'undefined' && define.amd) {
        define('rxfs', [], function() {
            return rxfs;
        })
    }
})();

