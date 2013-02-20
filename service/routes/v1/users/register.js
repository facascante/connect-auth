var async = require('async');
var email = require('../../../../library/email.js');
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
			min_invalid : {
				code : "INV_MIN",
				message : "Invalid or Missing mobile identification number",
				param : "min",
				value : req.body.min
			},
			puk1_invalid : {
				code : "INV_PUK1",
				message : "Invalid or Missing PUK 1",
				param : "puk1",
				value : req.body.puk1
			},
			puk1_unreg : {
				code : "UNREG_PUK1",
				message : "Unregistered PUK 1",
				param : "puk1",
				value : req.body.puk1
			},
			internal_dberror : {
				code : "DBFAILURE",
				message: "Unable to save record",
			}
	};
	console.log(req.body);
	if(typeof req.body.email == 'undefined' || !validateEmail(req.body.email)){
		res.json(400,ERROR.email_invalid);
	}
	else if(typeof req.body.password == 'undefined' || !req.body.password.length >=6){
		res.json(400,ERROR.password_invalid);
	}
	else if(typeof req.body.min == 'undefined' || !req.body.min.length >=10){
		res.json(400,ERROR.min_invalid);
	}
	else if(typeof req.body.puk1 == 'undefined' || !req.body.puk1.length >=5){
		res.json(400,ERROR.puk1_invalid);
	}
	else{
		
		async.auto({
			 validation: function(callback){
				 var content = {},condition = {};
				 condition.min = req.body.min;
				 condition.puk1 = req.body.puk1;
				 content.collection = 'users';
			     content.query = condition;
			     content.columns = {};
			     content.sorting = {};
			     
			     req.model.read(content,function(err,data){
			        	if(err){
			        		callback(ERROR.puk1_unreg);
			        	}
			        	else{
			        		callback(null,data);
			        	}
			     });
			 },
			 creation: ['validation', function(callback,result){
				 
				 var content = {}, record = {};
				 record.email = req.body.email;
				 record.password = req.body.password;
				 record.min = req.body.min;
				 record.puk1 = req.body.puk1;
			     content.collection = 'users';
			     content.record = record;
			     req.model.create(content,function(err,data){
			    	 if(err){
			    		 callback(ERROR.internal_dberror);
			    	 }
			    	 else{
			    		 callback(null,data);
			    	 }
			     });
			 }],
			 email: ['creation', function(callback,result){
				 var subject = "Welcome to Connect "+ req.body.first_name;
		         var message = "<b>Hi</b>";
		         email.Send(req.body.email,subject,message,function(error,callback){
		         });
		         callback(null,true);
			 }]
			
		},function(error, response){
			if(error){
				res.json(400,error);
			}
			else{
				res.json(200,{"success" : "ok"});
			}
		});
	}
	
};

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 