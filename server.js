var express    = require("express");
var db = require('./db/config');
var routesHandler = require('./routes/routesHandler');
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json()); 
var router = express.Router();
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
   next();
 }); 

app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render('index')
})


app.use('/api',router);
  routesHandler(router);



/*app.get('/:shorturl',async(req,res) =>{

}) */

app.listen(4000);