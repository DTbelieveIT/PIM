//index page
exports.index = function(req,res){
	res.render('index',{
		title:req.session.user?'员工信息管理系统(TYA)':'登陆页面',
		user:req.session.user
	})
}