let express = require('express')
let path = require('path')
let mongoose = require('mongoose')
let session = require('express-session')
let mongoStore = require('connect-mongo')(session)
let cookieSession = require('cookie-session')
let bodyParser = require('body-parser')
let logger = require('morgan')
let moment = require('moment')

//app config
let appConfig = require('./config/appConfig')
let port = process.env.PORT || appConfig.port
let appInit = require('./config/appInit')

//connect mongodb
mongoose.Promise = global.Promise
mongoose.connect(appConfig.database,function(){
	appInit()
})

let app = express()
app.set('view engine','jade')
app.set('views','./app/views/pages')
app.locals.moment = moment
app.use(cookieSession({
    secret: 'my secret',
    store: new mongoStore({
    	url:appConfig.database,
    	collection:'sessions'
    })
}))

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(logger('dev'))
mongoose.set('debug',true)	

require('./config/routes')(app)

app.listen(port)
console.log('Person Infomation Management is run at localhost:'+port)