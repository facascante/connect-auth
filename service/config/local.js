var config = module.exports = {
	MONGO_URL : 'mongodb://localhost/connect'
};

module.exports.local = function(req,res,next){

	req.local = config;
	return next();
};