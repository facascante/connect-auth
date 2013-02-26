
module.exports = function(req,res){
	var ERROR = {
			internal_dberror : {
				code : "DBFAILURE",
				message: "Unable to search record",
			}
	};
	var content = {},condition = {};
	condition._id = req.model.ObjectID.createFromHexString(req.params.id);
	content.collection = 'users';
    content.query = condition;
    content.columns = {mobile:true,email:true};
    req.model.read(content,function(err,data){
       	if(err){
       		console.log(err);
       		res.json(503,ERROR.internal_dberror);
       	}
       	else{
       		res.json(200,data);
       	}
    });
};
