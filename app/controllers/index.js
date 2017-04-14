//index page
exports.index = function(req,res){
	res.render('index',{
		title:req.session.user?'Personal Information Management in TYA':'登陆页面',
		user:req.session.user
	})
}