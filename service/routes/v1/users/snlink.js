var async = require('async');
var fbgraph = require('fbgraph');
var fboptions = {
    timeout:  30000
  , pool:     { maxSockets:  Infinity }
  , headers:  { connection:  "keep-alive" }
};
module.exports = function(req,res){
	
	var ERROR = {
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
			},
			min_invalid : {
				code : "INV_MIN",
				message : "Invalid or Missing mobile identification number",
				param : "mobile",
				value : req.body.mobile
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
			},
			duplicate_email : {
				code : "DUP_MIN",
				message : "Duplicate email address",
				param : "email",
				value : req.body.email
			},
			duplicate_mobile : {
				code : "DUP_MIN",
				message : "Duplicate Mobile Number",
				param : "mobile",
				value : req.body.mobile
			}
	};
	if(typeof req.body.token == 'undefined'){
		res.json(400,ERROR.token_invalid);
	}
	else if(typeof req.body.mobile == 'undefined' || !req.body.mobile.length >=10){
		res.json(400,ERROR.min_invalid);
	}
	else if(typeof req.body.puk1 == 'undefined' || !req.body.puk1.length >=5){
		res.json(400,ERROR.puk1_invalid);
	}
	else{
		
		async.auto({
			
			 getSNProfile: function(callback){
				 fbgraph.setAccessToken(req.body.token);
			     fbgraph.setOptions(fboptions).get("me", function(err, fbres) {
			    	  if (fbres.error) {
				          callback(ERROR.token_unauth);
				      }
				      else {
				    	req.body.email = fbres.email;
				        callback(null,fbres);
				      }
			     });
			 },
			 validate_puk: ['getSNProfile', function(callback,result){
				 var content = {},condition = {};
				 condition.mobile = req.body.mobile;
				 condition.puk1 = req.body.puk1;
				 content.collection = 'puklist';
			     content.query = condition;
			     content.columns = {};
			     content.sorting = {};
			     
			     req.model.read(content,function(err,data){
			        	if(err){
			        		callback(ERROR.internal_dberror);
			        	}
			        	else if(data.length == 0){
			        		callback(ERROR.puk1_unreg);
			        	}
			        	else{
			        		callback(null,data);
			        	}
			     });
			 }],
			 validate_duplicate: ['validate_puk', function(callback,result){
				 var content = {};
				 var condition = {"$or" : new Array({email:req.body.email},{mobile:req.body.mobile})};
				 content.collection = 'users';
			     content.query = condition;
			     content.columns = {};
			     content.sorting = {};
			     
			     req.model.read(content,function(err,data){
			        	if(err){
			        		callback(ERROR.puk1_unreg);
			        	}
			        	else if(data.length > 0){
			        		if(data[0].mobile == req.body.mobile){
			        			callback(ERROR.duplicate_mobile);
			        		}
			        		if(data[0].email == req.body.email){
			        			callback(ERROR.duplicate_email);
			        		}
			        	}
			        	else{
			        		callback(null,data);
			        	}
			     });
			 }],
			 creation: ['validate_duplicate', function(callback,result){
				 
				 var content = {}, record = {};
				 record.email = req.body.email;
				 record.mobile = req.body.mobile;
				 record.puk1 = req.body.puk1;
				 record.created_at = new Date();
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