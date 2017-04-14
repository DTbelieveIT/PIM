let User = require('../models/user')
let _  = require('underscore')
let fs = require('fs')
let path = require('path')

//signup page
exports.showSignup = function(req,res){
	res.render('signup',{
		title:'注册页面'
	})
};

//signin page
exports.showSignin = function(req,res){
	res.render('signin',{
		title:'登录页面'
	})
};

//signin
exports.signin = function(req,res){
	let _user = req.body.user
	let mail = _user.mail
	let password = _user.password
	User.findOne({mail:mail},function(err,user){
		if(err){
			console.log(err)
		}
		if(!user){
			return res.redirect('/signup')
		}

		user.comparePassword(password,function(err,isMatch){
			if(err){
				console.log(err)
			}
			if(isMatch){
				console.log('password is match')
				req.session.user = user
				return res.redirect('/')
			}else{
				console.log('password is not match')
				return res.redirect('/signin')
			}
		})
	})
}

//signup
exports.signup = function(req,res){
	let _user = req.body.user
	let mail = _user.mail

	if(req.img){
		_user.img = req.img
	}

	User.findOne({mail:mail},function(err,user){
		if(err){
			console.log(err)
		}
		//mail is exist
		if(user){
			return res.send({result:'mail is exist'})
		}else{
			let user = new User(_user)
			user.save(function(err,user){
				if(err){
					console.log(err)
				}
				res.redirect('/signin')
			})
		}
	})
}

//logout
exports.logout = function(req,res){
	delete req.session.user
	res.redirect('/')
}

//userlist
exports.list = function(req,res){
	User.fetch(function(err,users){
		if(err){
			console.log(err)
		}
		res.render('userlist',{
			title:'用户列表页',
			users:users
		})
	})
}

//user del
exports.del = function(req,res){
	let id = req.query.id
	if(id){
		User.remove({_id:id},function(err,user){
			if(err){
				console.log(err)
			}
			res.json({success:1})
		})
	}
}

//user update
exports.update = function(req,res){
	let id = req.params.id

	if(id){
		User.findById(id,function(err,user){
			if(err){
				console.log(err)
			}
			res.render('admin',{
				title:'后台更新页',
				user:user
			})

		})
	}
}

//user save
exports.save = function(req,res){
	let userObj = req.body.user
	let id = req.body.user._id
	let _user

	if(req.img){
		userObj.img = req.img
	}

	if(id){
		User.findById(id,function(err,user){
			let ppassword = user.password
			let pmail = user.mail
			if(err){
				console.log(err)
			}
			_user = _.extend(user,userObj)
			_user.save(function(err,user){
				if(err){
					console.log(err)
				}
				User.update({mail:pmail},{$set:{password:ppassword}},function(err,cb){
					if(err){
						console.log(err)
					}	
					res.redirect('/admin/user/list')
				})
			})
		})
	}else{
		_user = new User(userObj)

		_user.save(function(err,user){
			if(err){
				console.log(err)
			}
			res.redirect('/admin/user/list')
		})
	}
}

//user detail
exports.detail = function(req,res){
	let id = req.params.id

	User.findById(id,function(err,user){
		if(err){
			console.log(err)
		}
		res.render('userdetail',{
			title:'员工详情页',
			user:user
		})
	})
}

//user add
exports.add = function(req,res){
	res.render('useradd',{
		title:'成员添加'
	})
}


//signin required
exports.signinRequired = function(req,res,next){
	var user = req.session.user;
	if(!user){
		return res.redirect('/signin');
	}

	next();
};

//admin required
exports.adminRequired = function(req,res,next){
	var user = req.session.user;
	if(user.role === 0){
		return res.redirect('/signin')
	}
	next()
};


//user forget
exports.forget = function(req,res){
	res.render('forget',{
		title:'找回密码页'
    })
}

//user change password
exports.modifyPassword = function(req,res){
	let userObj = req.body.user
	let mail = userObj.mail
	let password = userObj.password
	let _user

	User.findOne({mail:mail},function(err,user){
		if(err){
			console.log(err)
		}
		_user = _.extend(user,userObj)
		_user.save(function(err,user){
			if(err){
				console.log(err)
			}
			res.redirect('/signin')
		})
	})
}

//save img
exports.saveImg = function(req,res,next){
	let imgData = req.files.uploadImg
	let filePath = imgData.path
	let originalFilename = imgData.originalFilename
	if(originalFilename){
		fs.readFile(filePath,function(err,data){
			let timestamp = Date.now()
			let type = imgData.type.split('/')[1]
			let img = timestamp+'.'+type
			let newPath = path.join(__dirname,'../../public/upload/'+img)

			fs.writeFile(newPath,data,function(err){
				req.img = img
				next()
			})
		})

	}else{
		next()
	}
}