//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var app = express(); 

// Body Parser Middleware
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Initiallising connection string
var dbConfig = {
    user:  "root",
    password: "password@1",
    server: "localhost",
    database:"mydb"
};

//Function to connect to database and execute query
var  executeQuery = function(res, query){             
    var con = mysql.createConnection(dbConfig);
     con.connect(function (err) {
         if (err) {   
                     console.log("Error while connecting database :- " + err);
                     res.send(err);
                  }
                  else {
                         // create Request object
                         // var request = new mysql.Request();

                         // query to the database
                         con.query(query, function (err, data) {
                           if (err) {
                                      console.log("Error while querying database :- " + err);
                                      res.send(err);
                                     }
                                     else {
                                         console.log('Data base hit success...')
                                         res.send(data);
                                         //console.log(data);
                                            }
                               });
                       }
      });           
}

//GET API
app.get("/api/getAllEmployee", function(req , res){
    // console.log('Hello World');
    // res.send('Hello World');
    console.log('inside api service method : getAllEmployee');
    var query = "select * from Employee";
    executeQuery (res, query);
});

app.get("/api/getAllEmployeeByName/:EmployeeName", function(req , res){
    // console.log('Hello World');
    // res.send('Hello World');
    var employeeName = req.params.EmployeeName
    console.log('inside api service method : getAllEmployeeByName : ' + employeeName);
    var query = "select * from Employee where Name = '" + employeeName + "'" ;
    console.log('Query : ' + query);
    executeQuery (res, query);
});

app.get("/api/getAllEmployeeById/:Id", function(req , res){
    var empId = req.params.Id
    console.log('inside api service method : getAllEmployeeById : ' + empId);
    var query = "select * from Employee where Id = " + empId;
    // console.log('Query : ' + query);
    executeQuery (res, query);
});

// POST API
 app.post("/api/addEmployee", function(req , res){
    console.log('inside api service method : addEmployee');
    //console.log(req.body);
    var query = "INSERT INTO Employee (Id, Name, Salary) VALUES (" + req.body.Id + ",'" + req.body.Name + "'," + req.body.Salary + ") ";
    // console.log(query);
    executeQuery (res, query);
});

//PUT API
 app.put("/api/saveEmployee/:id", function(req , res){
    console.log('inside api service method : saveEmployee : ' + req.params.id);
    var query = "UPDATE Employee SET Name= '" + req.body.Name  +  "' , Salary=  " + req.body.Salary + "  WHERE Id= " + req.params.id;
    // console.log(query);
    executeQuery (res, query);
});

// DELETE API
 app.delete("/api/deleteEmployee/:id", function(req , res){
    console.log('inside api service method : deleteEmployee : ' + req.params.id);
    var query = "DELETE FROM Employee WHERE Id=" + req.params.id;
    console.log(query);
    executeQuery (res, query);
});

// application -------------------------------------------------------------
// app.get('/', function(req, res) {
//     res.sendFile('E:/API Ex/1st_App/public/employeeList.html'); // load the single view file (angular will handle the page changes on the front-end)
// });

//Setting up server

 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;    
    console.log("App now running on port", port);
 });
