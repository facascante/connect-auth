var mysql = require('mysql');
var pool  = mysql.createPool({
	  host     : 'localhost',
	  user     : 'connect_auth',
	  password : 'connect_auth',
	  database : 'connect_auth'
});

var ERROR = {
		db_unavailable : {
			code : "DB_UNA",
			message : "Unable to connect to Mysql DB",
			param : "database"
		},
		db_execute_failed : {
			code : "DB_EXF",
			message : "Unable to save record",
			param : "database"
		}
};

var model = {
	insert : function(content,cb){
		pool.getConnection(function(err, connection) {
			if(err){
				cb({code:503,msg:ERROR.db_unavailable});
			}
			else{
				connection.query("INSERT INTO "+content.table+" SET ?",content.record,function(err,result){
					if(err){
						console.log(err);
						cb({code:503,msg:ERROR.db_execute_failed});
					}
					else{
						cb(null,result);
					}
				});
			}
		});
	},
	read : function(content,cb){
		pool.getConnection(function(err, connection) {
			if(err){
				cb({code:503,msg:ERROR.db_unavailable});
			}
			else{
				connection.query("SELECT * FROM "+content.table+" WHERE ?",content.condition,function(err,result){
					if(err){
						console.log(err);
						cb({code:503,msg:ERROR.db_execute_failed});
					}
					else{
						cb(null,result);
					}
				});
			}
		});
	},
	
};

module.exports = function(req,res,next){

	req.model = model;
	return next();
};