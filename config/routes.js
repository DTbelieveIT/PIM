let Index = require('../app/controllers/index')
let User = require('../app/controllers/user')
let multipart = require('connect-multiparty')
let multipartMiddleware = multipart()

module.exports = function(app){
	//pre handle user
	app.use(function(req,res,next){
		var _user = req.session.user;
		app.locals.user = _user;

		next();
	})

	//Index
	app.get('/',Index.index)

	//User
	app.get('/signin',User.showSignin)
	app.get('/signup',User.showSignup)
	app.get('/forget',User.forget)
	app.post('/user/signup',multipartMiddleware,User.saveImg,User.signup)
	app.post('/user/signin',User.signin)
	app.post('/user/forget',User.modifyPassword)
	app.get('/logout',User.logout)
	app.get('/admin/user/list',User.signinRequired,User.list)
	app.get('/admin/user/add',User.signinRequired,User.add)
	app.get('/admin/user/detail/:id',User.signinRequired,User.detail)
	app.get('/admin/user/update/:id',User.signinRequired,User.update)
	app.post('/admin/user',User.signinRequired,multipartMiddleware,User.saveImg,User.save)
	app.delete('/admin/user/list',User.signinRequired,User.del)
}