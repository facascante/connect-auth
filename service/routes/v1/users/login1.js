var async = require('async');
var crypto = require('crypto');
var hash = require('../../../../library/passwordHash.js');
var cryptography = require('../../../../library/cryptography.js');
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
			internal_dberror : {
				code : "DBFAILURE",
				message: "Unable to get record",
			},
			
	};
	console.log(req.body);
	if(typeof req.body.email == 'undefined' || !validateEmail(req.body.email)){
		res.json(400,ERROR.email_invalid);
	}
	else if(typeof req.body.password == 'undefined' || !req.body.password.length >=6){
		res.json(400,ERROR.password_invalid);
	}
	else{
		
		async.auto({
			 
			 getProfile:  function(callback,result){
				 
				 var content = {};
				 var condition = {email:req.body.email};
				 content.collection = 'users';
			     content.query = condition;
			     content.columns = {};
			     content.sorting = {};
			     
			     req.model.read(content,function(err,data){
			        	if(err){
			        		callback(ERROR.internal_dberror);
			        	}
			        	else if(data.length == 1){
			        		callback(null,data[0]);
			        	}
			        	else{
			        		callback(ERROR.email_invalid);
			        	}
			     });
			 },
			 authenticate: ['getProfile', function(callback,result){
				
				 var input_password = hash.generatePassword(result.getProfile.salt,req.body.password);
				 if(input_password != result.getProfile.password){
					 callback(ERROR.password_invalid);
				 }
				 else{
					 callback(null,true);
				 }
			 }],
			 generateKey: ['authenticate', function(callback,result){
				
				 var user = result.getProfile;
				  
			        var raw_skey = {};
			        raw_skey.ver = 'v1';
			  
			        raw_skey.user_id = user._id;
			        raw_skey.username = user.email;
			        raw_skey.issued_at = new Date().getTime();
			        raw_skey.expire_at = new Date().getTime() + 2592000000;
			        var skey = cryptography.generateKey(raw_skey);
			        var key = {s:skey};
			        callback(null,key);
			 }]
			
		},function(error, response){
			if(error){
				res.json(400,error);
			}
			else{
				res.json(200,response.generateKey);
			}
		});
	}
	
};

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 