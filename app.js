var express=require("express");
var app=express();
const bodyParser = require("body-parser");
const uuid =require("uuid")
app.set('view engine','ejs');
app.use(express.static(__dirname + "/public"));
var cors = require('cors');
var port=process.env.PORT || 9000;

database =[{
	id:uuid.v4(),
	title:"Angels and Demons",	
		},
	{
	id:uuid.v4(),
	title:"Deception Point",
	
 },
{
	id:uuid.v4(),
	title:"Digital Fortress",
	
}]
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


app.get('/getbooks',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	res.json(database)
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