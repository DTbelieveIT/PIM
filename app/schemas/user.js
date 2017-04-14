var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var UserSchema = new mongoose.Schema({
	mail:{
		unique:true,
		type:String
	},
	password:String,
	//0: normal user
	//1: admin
	role:{
		type:Number,
		enum:[0,1],
		default:1
	},
	name:String,
	sex:{
		type:String,
		enum:['male','female']		
	},
	age:Number,
	tel:Number,
	position:String,
	department:String,
	img:String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

UserSchema.pre('save',function(next){
	var user = this

	//encrypt
	bcrypt.hash(user.password,null,null,function(err,hash){
		if(err){
			return next(err)
		}
		user.password = hash
		next()
	})
})

UserSchema.methods = {
	comparePassword:function(_password,cb){
		bcrypt.compare(_password,this.password,function(err,res){
			if(err){
				cb(err)
			}
			cb(null,res)
		})
	}
}

UserSchema.statics = {
	fetch:function(cb){
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cb)
	},
	findById:function(id,cb){
		return this
		.findOne({_id:id})
		.exec(cb)
	}
}

module.exports = UserSchema