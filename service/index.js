
/**
 * Module dependencies.
 */

var express = require('express')
  , router = require('./routes/autoload')
  , path = require('path')
  , config = require('./config/local.js')
  , model = require('./models/_model.js')
  , expressValidator = require('express-validator')
  , cryptography = require('../library/cryptography.js');

var app = module.exports = express();

var ERRORS = {
  forbidden: {code: -403, message:"Forbidden"}
}

app.configure(function(){
  app.use(express.logger('dev'));
  app.use(expressValidator);
  app.use(config.local);
  app.use(model);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(app.router);
  
});


function restrict(req, res, next) {
	if (req.headers.s) {
		var raw_skey = cryptography.verifyKey(req.headers.s);
		if(raw_skey){
			if(req.params.user_id == "me"){
				req.params.user_id = raw_skey.user_id;
				req.raw_skey = raw_skey;
				console.log(raw_skey);
			}
			next();
		}
		else {
			next(new Error('403'));
		}
	} 
	else {
		next(new Error('403'));
	}
}

function errorHandler(options) {
  return function errorHandler(err, req, res, next) {
    if (err.message == '403') {
      var error = ERRORS.forbidden;
      res.json(403,{error:error}); return;
    }    
  }
  
}

app.configure(function(){
  //app.use(express.errorHandler({showStack: true, dumpExceptions: true}));
  app.use(errorHandler());
});

app.post('/api/:version/users/register', router.register);
app.get('/api/:version/users/:id', router.search);
app.post('/api/:version/users/login', router.login);


