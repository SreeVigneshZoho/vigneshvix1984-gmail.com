//MySQL
const mySQL = require('mysql');
console.log("My SQL data print");
console.log(mySQL);

//Show HTML

//Get data and update in sql.

var fs = require('fs');
console.log("File Store");

// //HTTP in node
const http = require('http');

// const httpServer = http.createServer();

// httpServer.on('listener', (socket) => {
// console.log("New Connection");
// });
// httpServer.listen(3000);

// console.log("Listening on port 3000");


fs.readFile('./FinalVersion.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    console.log("request");
    http.createServer(function(request, response) { 
        console.log(request.length);
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(8080);

    // console.log(request);
});
