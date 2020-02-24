var express=require("express");
var app=express();
const bodyParser = require("body-parser");
const uuid =require("uuid")
app.set('view engine','ejs');
app.use(express.static(__dirname + "/public"));
var cors = require('cors');
var port=process.env.PORT || 9000;

database ={
	data:[
	{
		value:'SSO certificate 1',
		label:'SSO certificate 1'
	},{
		value:'SSO certificate 2',
		label:'SSO certificate 2'
	},{
		value:'SSO certificate 3',
		label:'SSO certificate 3'
	},{
		value:'SSO certificate 4',
		label:'SSO certificate 4'
	},
				
	]
  }



app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());




app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(process.env.PORT || 8080);

app.options('*', cors()); 

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
    next();
});


app.get('/getdata',function(req,res){
	
	setTimeout(()=>{
		res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
		res.json(database)
	},3000) 
});




app.post('/getbooks',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	let title = req.body.title ;
	let new_data ={id:uuid.v4(),title:title};
	database.push(new_data)
	res.json(new_data)
});

app.post('/deletebooks',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	let id = req.body.id
	
	database = database.filter(e => {
		return e.id != id;
	})
	res.json(database)

});




app.listen(port, process.env.IP, () =>{
	console.log("The  Server Has Started at port "+port);
} 
 );