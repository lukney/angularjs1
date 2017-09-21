var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

//url parameters
/*var url = require('url');
var adr = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=504103&destinations=411052&key=AIzaSyAykFlST8qAZY7EzGLEN4lTTNpPirenuVE';
//Parse the address:
var q = url.parse(adr, true);

/*The parse method returns an object containing url properties*/
/*console.log(q.host);
console.log(q.pathname);
console.log(q.search);
*/
/*The query property returns an object with all the querystring parameters as properties:*/
/*var qdata = q.query;
console.log(qdata.origins);
console.log(qdata.destinations);*/


var distance = require('google-distance-matrix');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/destinationapi', function (req, res){
	var origins=[req.body.origins]; 
	var destinations=[req.body.destinations];
   var dist;
  var user_gms=req.body.user_gms;
distance.key('AIzaSyAykFlST8qAZY7EzGLEN4lTTNpPirenuVE');
distance.units('metric');

distance.matrix(origins, destinations, function (err, distances) {
  
        

if (distances.status == 'OK') {
        for (var i=0; i < origins.length; i++) {
            for (var j = 0; j < destinations.length; j++) {
                var origin = distances.origin_addresses[i];
                var destination = distances.destination_addresses[j];
                if (distances.rows[0].elements[j].status == 'OK') {
                     dist = distances.rows[i].elements[j].distance.text;
					console.log(dist);
                    console.log('Distance from ' + origin + ' to ' + destination + ' is ' + dist);
					
					     var user_gms=req.body.user_gms;
						   var orginal_amount=500;
						   var total_amount;
						 var weightGroup;
                         var col;
						if((user_gms>200 && user_gms<=500)&& (dist>200 && dist<=1000)){
						   col='kms201_1000';
						   weightGroup = '201 - 500 gms';
					   }
						
					   /*if((user_gms>200 && user_gms<=500)&& (dist>200 && dist<=1000)){
						   col='kms201_1000';
						   weightGroup = '201 - 500 gms';
					   }/*else if(user_gms>50 && user_gms<=200){
						   weightGroup='51 - 200 gms';
					   }else 
						   if((user_gms>200 && user_gms<=500) && (dist>200 && dist<=1000)){
						    col='kms201_1000';
						   weightGroup='201 - 500 gms';
					   }/*else /*if(user_gms>500 &&){
						   weightGroup='add 500 gms';
					   }*/
					  // console.log(weightGroup);*/
				
					  connection.query("select ' + [col] + ' from rates where weights = ?" , [weightGroup], function(error, results ){
	   //select  [col]  from rates where weights = ? ",[weightGroup],
	   res.end(JSON.stringify(results));
	   });
					 
						// console.log(Number(results[0].solution));
						  /* if(user_gms>500){		   
						   console.log(user_gms);
						  
						   //*res1= [(user_gms-orginal_amount)/orginal_amount]*10;
						   //console.log(res1);
						   total_amount= 30 + Number(results[0].local);
						   console.log(total_amount);
					   
						   }
						 */
					 
						
				}
					
                 else {
                    console.log(destination + ' is not reachable by land from ' + origin);
                }
            }
        }
    }
}); 

 
});


//start mysql connection
var connection = mysql.createConnection({
  host     : 'localhost', //mysql database host name
  user     : 'root', //mysql database user name
  password : '', //mysql database password
  database : 'chat', //mysql database name
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
var server = app.listen(8085,   function () {

  var host = server.address().address
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
   connection.query('select * from user ', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
//var distance = require('google-distance-matrix');



  //checking amounts..
  app.post('/amount', function (req, res) {
	//get data
   
       var user_gms=req.body.user_gms

   
   connection.query("select * from rates where user_gms= ? ",['1 - 50 gms'], function(error, results ){

           if(error){
                console.log("Mysql error, check your query");
                
           }else{
			   if(user_gms='1 - 50 gms'){
				   console.log(user_gms);
			   }
		   }

          res.sendStatus(200);

        });
});
  //checking amounts with weights
  //checking amounts..
  app.post('/amounts', function (req, res) {
	//get data
   
       var user_gms=req.body.user_gms;
	   var orginal_amount=500;
	   var res1,total_amount;
	 var weightGroup;

   if(user_gms>0 && user_gms<=50){
	   weightGroup = '1 - 50 gms';
   }else if(user_gms>50 && user_gms<=200){
	   weightGroup='51 - 200 gms';
   }else if(user_gms>200 && user_gms<=500){
	   weightGroup='201 - 500 gms';
   }else if(user_gms>500){
	   weightGroup='add 500 gms';
   }
    
   
   connection.query("select * from rates where weights = ? ",[weightGroup], function(error, results ){
	   
	   res.end(JSON.stringify(results));
	   console.log(Number(results[0].local));
	 
	   if(user_gms>500){		   
	   console.log(user_gms);
	  
	   /*res1= [(user_gms-orginal_amount)/orginal_amount]*10;
	   console.log(res1);*/
	   total_amount= 30 + Number(results[0].local);
	   console.log(total_amount);
   }
   
	 
 
	});
});

app.post('/insertquery', function (req, res) {
	//get data
	
     var or = req.body.origins;
	  var patt1 = /[0-9]/g;
	 var result = or.match(patt1);
	 if(result){
		var origins1= req.body.origins;
		 //var origins1=req.body.origins;
		// var array = string.split(",").map(Number);
		connection.query("select pincode ,location from karnataka where pincode  like   ? ",   origins1 + '%',function (error, results,fields){
	   if (error) throw error;
	  res.end(JSON.stringify(results));
  
  })
	}	 
	 else if(or.search(/[^a-zA-Z]+/) === -1) {
		 var origins2=or;
 connection.query("select location,pincode from karnataka where location  like   ? ", origins2+'%' ,function (error, results,fields){
	   if (error) throw error;
	  res.end(JSON.stringify(results));
  
  })
}
	 
	
	
});

app.post('/addnewdevice', function (req, res) {
	 var name=req.body.name;
   connection.query("SELECT * FROM users1 WHERE username LIKE '%name' ", function (error, results, fields) {
	   if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});