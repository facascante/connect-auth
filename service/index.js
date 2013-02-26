
/**
 * Module dependencies.
 */

var express = require('express')
  , router = require('./routes/autoload')
  , path = require('path')
  , config = require('./config/local.js')
  , model = require('./models/_model.js')
  , expressValidator = require('express-validator');

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
app.post('/api/:version/users/login', router.login);





