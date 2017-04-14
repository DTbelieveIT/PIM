let Index = require('../app/controllers/index')
let User = require('../app/controllers/user')

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
	app.post('/user/signup',User.signup)
	app.post('/user/signin',User.signin)
	app.post('/user/forget',User.modifyPassword)
	app.get('/logout',User.logout)
	app.get('/admin/user/list',User.signinRequired,User.adminRequired,User.list)
	app.get('/admin/user/add',User.signinRequired,User.adminRequired,User.add)
	app.get('/admin/user/detail/:id',User.signinRequired,User.adminRequired,User.detail)
	app.get('/admin/user/update/:id',User.signinRequired,User.adminRequired,User.update)
	app.post('/admin/user',User.signinRequired,User.adminRequired,User.save)
	app.delete('/admin/user/list',User.signinRequired,User.adminRequired,User.del)
}