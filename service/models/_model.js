var mongoq = require('mongoq');
config = require('../config/local.js');

var db = mongoq(config.MONGO_URL);

/*
ALL:
- collection
READ:
- query
- columns
- sorting
- page
- rows
CREATE:
- record
UPDATE:
- query
- record
REMOVE:
- query
*/

var model = {
    
    read : function(content,cb){
      db.collection(content.collection)
      .find(content.query,content.columns)
      .sort(content.sorting).skip(content.page || 0)
      .limit(content.rows || 0).toArray()
      .done(function(result){   
          cb(null,result);
      })
      .fail( function( err ) { 
          cb(err);
      });    

    },
    create : function(content,cb){
      db.collection(content.collection)
      .insert(content.record, {safe: true})
      .done(function(result){   
        cb(null,result);
      })
      .fail( function( err ) { 
        cb(err);
      });    
    },
    update : function(content,cb){
        db.collection(content.collection)
        .update(content.query, content.record, {safe: true})
        .done(function(result){   
            cb(null,result);
        })
        .fail( function( err ) { 
            cb(err);
        });   
    },
    remove : function(content,cb){
        db.collection(content.collection)
        .remove(content.query, {safe: true})
        .done(function(result){   
            cb(null,result);
        })
        .fail( function( err ) { 
            cb(err);
        });
    }
    
};
module.exports = function(req,res,next){

	req.model = model;
	return next();
};
