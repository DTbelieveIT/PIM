let User = require('../app/models/user')
let appConfig = require('./appConfig')
let adminstrator = appConfig.adminstrator

module.exports = function(){
	User.findOne({mail:adminstrator.mail},function(err,user){
		if(err){
			console.log(err)
		}
		if(!user){
			console.log('root@tya.com is not exist')
			let _user = new User(adminstrator)
			_user.save(function(err,user){
				if(err){
					console.log(err)
				}
			})
		}
	})	
}