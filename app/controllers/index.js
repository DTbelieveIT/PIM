//index page
exports.index = function(req,res){
	console.log(req.session.user)
	res.render('index',{
		title:'Personal Information Management in TYA',
		user:req.session.user
	})
}