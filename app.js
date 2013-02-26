var config = require('./config/global.js');
var express = require('express');

express()
.use(config.global)
.use(express.vhost('175.41.169.27', require('./service')))
.listen(config.PORT,function(){
	 console.log("----------------Connect Auth READY----------------");
});