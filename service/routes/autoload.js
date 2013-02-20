var version = {};
version.v1 = {
		routes : require('./v1/_user.js')
}

module.exports = {

	register : function(req,res){
		var instance = version[req.params.version];
		execute(instance, res, instance.routes.register(req,res));
	},
	search : function(req,res){
		var instance = version[req.params.version];
		execute(instance, res, instance.routes.search(req,res));
	},
	update : function(req,res){
		var instance = version[req.params.version];
		execute(instance, res, instance.routes.update(req,res));
	},
	login : function(req,res){
		var instance = version[req.params.version];
		execute(instance, res, instance.routes.login(req,res));
	}

};

function execute(instance, res, next) {
  if(!(typeof instance == 'undefined')){
		next;
	}
	else{
		res.json(404,{code:-996, message:"Invalid API version"});
	}
}