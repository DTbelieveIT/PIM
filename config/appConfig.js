module.exports = {
	database:process.env.MONGO_URI || 'mongodb://localhost/pim',
	port:3000,
	adminstrator: {
	    "mail" : "root@tya.com",
	    "password" : "root",
	    "name" : "管理员",
	    "sex" : "female",
	    "tel" : 12345678910,
	    "age" : 99,
	    "img" : '',
	    "department" : "逆向组",
	    "position" : "web开发",
	    "role" : 1,
	}
}