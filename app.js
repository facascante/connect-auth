var config = require('./config/global.js');
var express = require('express');

express()
.use(config.global)
.use(express.vhost(config.PROFILEWEB_URL, require('./service')))
.listen(config.PORT,function(){
	 console.log("----------------Connect Auth READY----------------");
});