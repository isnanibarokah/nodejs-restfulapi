//REST API demo in Node.js
var express = require('express'); // requre the express framework
var app = express();
var fs = require('fs'); //require file system object

//Create a new user variable
var user = {
    "user5": {
        "id":5,
        "firstname":"Langit",
        "lastname":"Akbar",
        "email":"langit@gmail.com"
      },
} 

// Endpoint to Get a list of users
app.get('/getUsers', function(req, res){
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
        console.log(data);
        res.end(data);
    });
})

//Endpoint to add user
app.post('/addUser', function(req, res){
    //read existing users
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
        data = JSON.parse(data);
        //append user variable to list
        data["user5"] = user["user5"];
        console.log(data);
        res.end(JSON.stringify(data));
    });
})

//Endpoint to get a single user by id
app.get('/:id', function (req, res) {
    //retrieve existing user list
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
    });
 })

 //Endpoint to delete a user by id
 var id = 3;
 app.delete('/deleteUser', function (req, res) {
    //retrieve existing users
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 3];
        
       console.log( data );
       res.end( JSON.stringify(data));
    });
 })

// Create a server to listen at port 8080
var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})

