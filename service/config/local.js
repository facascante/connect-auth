var config = module.exports = {
	MONGO_URL : 'mongodb://localhost/profile',
	BAD_WORDS : new Array('Fuck','Pussy','Masturbate','Asshole','Pornography','Tangina','Test','Smartnet','Kupal','Sex','Vagina','Ejaculate',
			  'Douche','Putangina','Kantutan','Admin','Netphone','Bitch','Fucker','Nipples','Breast','Douchebag','Punyeta',
			  'Kantot','Administrator','Penis','Bayag','Motherfucker','Bullshit','Shit','Blowjob','Tarantado','Pekpek',
			  'Training','Bullshet','Shet','Puke'),
	ERROR_MESSAGES : {
		identity : "Invalid identity",
		credential : "Invalid credential",
		user_id : "Invalid user id",
		sn_type : "Invalid sn type",
		sn_user_id : "Invalid sn user id",
		sn_token : "Invalid token",
		query : "Invalid search query",
		friend_id : "Invalid Friend Id",
		first_name : "Invalid Firstname",
		last_name : "Invalid Lastname",
		sec_q : "Invalid security question",
		sec_a : "Invalid security answer",
		username : "Invalid username",
		password : "Invalid password",
		mobile_number : "Invalid Mobile Number",
		email : "Invalid Email Address",
		channel	: "Activation Channel is required",
		key : "Activation Key is required",
		coordinates : "coordinates is invalid",
		photo_url : "photo_url is invalid",
		eac : "Email Activation Key is invalid",
		mac : "Mobile Activation Key is invalid",
		dob : "Date of Birth is invalid",
		gender : "Gender is invalid",
		relationship_status : "Relationship Status is invalid",
		hometown : "Hometown is invalid",
		location : "Location is invalid",
		alternate_mobile_numbers : "Alternate Mobile Numbers is invalid",
		work_phone_numbers : "Work Phone Numbers is invalid",
		home_phone_numbers : "Home Phone Numbers is invalid",
		fax_numbers : "Fax Numbers is invalid",
		alternate_email_addresses : "Alternate Email Address is invalid",
		occupation : "Occupation is invalid",
		schools_attended : "Schools Attended is invalid",
		snlinks : "Social Network links is invalid",
		success : "Transaction Completed"
	},
	SUCCESS_MESSAGES : {
		success : "Transaction Completed"
	},
	VIEW_SETTINGS : {
		  PRIVATE : {
		    _id: false,
		    user_id : true,
		    salt : true,
		    password : true,
		    first_name : true,
		    last_name : true,
		    pcf : true, //change to timestamp
		    username : true,
		    mobile_number : true,
		    email : true,
		    channel : true,
		    key : true,
		    coordinates : true,
		    photo_url : true,
		    dob : true,
		    gender : true,
		    relationship_status : true,
		    hometown : true,
		    location : true,
		    alternate_mobile_numbers : true,
		    work_phone_numbers : true,
		    home_phone_numbers : true,
		    fax_numbers : true,
		    alternate_email_addresses : true,
		    occupation : true,
		    schools_attended : true,
		    snlinks : true,
		    email_status : true,
		    mobile_status : true,
		    status: true
		  },
		  PUBLIC : {
		    _id: false,
		    user_id : true,
		    first_name : true,
		    last_name : true,
		    username : true,
		    dob : true,
		    mobile_number : true,
		    email : true,
		    coordinates : true,
		    photo_url : true,
		    gender : true,
		    relationship_status : true,
		    hometown : true,
		    location : true,
		    alternate_mobile_numbers : true,
		    work_phone_numbers : true,
		    home_phone_numbers : true,
		    fax_numbers : true,
		    alternate_email_addresses : true,
		    occupation : true,
		    schools_attended : true,
		    snlinks : true,
		    friends: true
		  },
		  SUMMARY : {
			_id: false,
			user_id : true,
			first_name : true,
			last_name : true,
			username : true,
			photo_url : true,
			location : true
		  }	  
	},
	merge : function() {
	    var obj = {},
	        i = 0,
	        il = arguments.length,
	        key;
	    if (il === 0) {
	        return obj;
	    }
	    for (; i < il; i++) {
	        for (key in arguments[i]) {
	            if (arguments[i].hasOwnProperty(key)) {
	                obj[key] = arguments[i][key];
	            }
	        }
	    }
	    return obj;
	},
	safeMerge : function(src,dst){
		for(key in src){
			if(dst.hasOwnProperty(key)){
				src[key] = dst[key];
			}
		}
		return src;
	}
	,
	parse : function(obj){
		try{
			  return JSON.parse(obj);
		}
		catch(e){
			  return false
	    }
	}
	
};

module.exports.local = function(req,res,next){

	req.local = config;
	return next();
};