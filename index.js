var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

//start mysql connection
var connection = mysql.createConnection({
  host     : 'sangeetha.cgcpmi6mcuyv.us-east-2.rds.amazonaws.com', //mysql database host name
  user     : 'sangeetha', //mysql database user name
  password : '12345678', //mysql database password
  database : 'sangeetha', //mysql database name
  port     : '3306'  
});

connection.connect(function(err) {
  if (err) throw err
  
})
//end mysql connection

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//create app server
var server = app.listen(3008,   function () {

  var host = 'ec2-18-221-108-81.us-east-2.compute.amazonaws.com'
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});

//rest api to get all customers
app.get('/customer', function (req, res) {
   connection.query('select * from karnataka', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
app.post('/customers', function (req, res) {
   connection.query('select * from karnataka', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
app.get('/user', function (req, res) {
   connection.query('select * from user', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

app.post('/users', function (req, res) {
   connection.query('select * from user', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
app.post('/insert', function (req, res) {
	//get data
    var data = {
        name:req.body.name,
        mobileno:req.body.mobileno,
        emailid:req.body.emailid,
		dob:req.body.dob
     };
   connection.query("INSERT INTO user set ? ",data, function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

          res.sendStatus(200);

        });
});
