var async = require('async');
var hash = require('../../../../library/passwordHash.js');
var crypto = require('crypto');
var fbgraph = require('fbgraph');
var fboptions = {
    timeout:  30000
  , pool:     { maxSockets:  Infinity }
  , headers:  { connection:  "keep-alive" }
};
module.exports = function(req,res){

	var ERROR = {
			email_invalid : {
				code : "INV_EMAI",
				message : "Invalid or Missing Email Address",
				param : "email",
				value : req.body.email
			},
			password_invalid : {
				code : "INV_PASS",
				message : "Invalid or Missing password",
				param : "password",
				value : req.body.password
			},
			token_invalid : {
				code : "INV_TOKE",
				message : "Invalid or Missing token",
				param : "token",
				value : req.body.token
			},
			token_unauth : {
				code : "UNA_TOKE",
				message : "Unauthorize token",
				param : "token",
				value : req.body.token
			}
	};
	
	async.auto({

		validate : function(callback){
			
			if(!req.body.token){
				if(typeof req.body.email == 'undefined' || !validateEmail(req.body.email)){
					callback({code:400,msg:ERROR.email_invalid});
				}
				else if(typeof req.body.password == 'undefined'){
					callback({code:400,msg:ERROR.password_invalid});
				}
				else{
					callback(null,true);
				}
				
			}
			else{
				try{
				 fbgraph.setAccessToken(req.body.token);
			     fbgraph.setOptions(fboptions).get("me", function(err, fbres) {
			    	 console.log(err);
			    	  if (fbres.error) {
				          callback({code:400,msg:ERROR.token_unauth});
				      }
				      else {
				    	req.body.email = fbres.email;
				    	if(typeof req.body.email == 'undefined' || !validateEmail(req.body.email)){
							callback({code:400,msg:ERROR.email_invalid});
						}
				    	else{
				    		callback(null,true);
				    	}
				      }
			     });
				}
				catch(e){
					console.log(e);
				}
			}
			
		},
		authenticate : [ 'validate', function(callback){
			
			var condition = {};
			condition.email = req.body.email;
			var content = {};
			content.table = "users_profile";
			content.condition = condition;
			console.log(content);
			req.model.read(content,function(error,response){
				console.log(response);
				if(error || response.length == 0){
					callback(error);
				}
				else{
					if(!req.body.token){
						password = hash.generatePassword(response[0].salt,req.body.password);
						console.log(password);
						console.log(response[0].password);
						if(password != response[0].password){
							callback({code:400,msg:ERROR.password_invalid});
						}
						else{
							delete response[0].salt;
							delete response[0].password;
							callback(null,response[0]);
						}
					}
					else{
						delete response[0].salt;
						delete response[0].password;
						callback(null,response[0]);
					}
				}
			});
			
		}]
	},
	function(error,result){
		if(error){
			res.json(error.code,error.msg);
		}
		else{
			res.json(200,result.authenticate);
		}
	});
};

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 