//MySQL
const mysql = require('mysql');
console.log("My SQL data print");
console.log(mysql);


//Show HTML

var fs = require('fs');
console.log("File Store");

// //HTTP in node
const http = require('http');


fs.readFile('./FinalVersion.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    console.log("request");
    http.createServer(function(request, response) { 
        var params = request.url;
        console.log(request.method);
        console.log(params);
        if(!params.includes("favicon"))
            {
                //console.log(request);
                        console.log(params);
                        console.log(params.length);
                        //Create sql connection here.
                        
                        con = mysql.createConnection({
                            host: 'sql12.freemysqlhosting.net',
                            port: 3306,
                            user: 'sql12329759',
                            password: 'GBkYyJIfyg'
                          });

                        //Fetch tagname and color here
                        //If params equals just a / consider as page load and load the html
                        if(params.includes("getAllTags"))
                            {
                            console.log("printing db resp");
      
                            con.query('use sql12329759',function(err,rows,field) {
                                if(!err) {
                                    console.log("no error in db");
                                } else {
                                    //  console.log("error");
                                    console.log(err);
                                }
                            });
    
                            var tagList = [];
                            var tagString = "";
                            console.log('printing all tags');
                            con.query('SELECT*from Tags',function(err,rows,field) {
                                if(!err) {
                                    // console.log(rows);
                                    rows.forEach( (row) => {
                                        console.log(`${row.Name} - ${row.Color}`);
                                        tagList.push(`${row.Name} - ${row.Color}`);
                                    });
                                    
                                    tagString = tagList.toString(",");

                                    console.log(tagString);        
                                    response.write(tagString);
                                    response.end();
    
                                } else {
                                    //  console.log("error");
                                    console.log(err);
                                }
                            });

                                console.log("return tags from mysql as response");
                            }
                        else
                            {
                            //If condition is to differentiate between request on page load and tagname request
                            if(params.includes("deseven"))
                                {
                                console.log("Event form submission");
                                
                                con.query('use sql12329759',function(err,rows,field) {
                                    if(!err) {
                                        console.log("no error in db");
                                    } else {
                                        //  console.log("error");
                                        console.log(err);
                                    }
                                });
                                
                                listOfParams = params.split("&");
                                description = listOfParams[1];
                                //Check and replace + across strings.
                                description = description.replace(/\+/g," ");
                                description = description.replace(/%20/g," ");
                                date = listOfParams[2];
                                //Convert date to timestamp
                                timeStamp = new Date(date).getTime();
                                console.log("timestamp : "+timeStamp);
                                tag = listOfParams[3];
                                tag = tag.replace("color=","");
                                tag = tag.replace(/\+/g," ");
                                tag = tag.replace(/%20/g," ");
                                console.log("desc : "+description);
                                console.log("date :  "+date);
                                console.log("tag : "+tag);
                                //"INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')"
                                var query = 'INSERT INTO Timeline(Date, Timestamp, Data, Tag) VALUES("'+date+'","'+timeStamp+'","'+description+'","'+tag+'");';
                                //`var timeStamp = parseInt("1582848000000",10);
                                //var query = "INSERT INTO Timeline (Date, Timestamp, Data, Tag) VALUES ('28-02-2029','"+timeStamp+"','Test description','tag')";
                                con.query(query,function(err,rows,field) {
                                    // response.setContentType("text/plain"); 
                                if(!err) {
                                    response.write("Event added successfully!");
                                    response.end();
                                } else {
                                    response.write("Error in adding event");
                                    response.end();
                                }
                            });

                                //Request to store event.
                                //Update events sql db with event data
                                //Update timestamp sql db with event data.
                                }  
                            else if(params.includes("alleventspageload"))
                                {
                                 //Return all events from sql db from cliqtimeline table
                                 console.log('printing all data from timeline');
                                 allParams = params.split("&");
                                 fromDate = allParams[1];
                                 console.log("from - "+fromDate);
                                 toDate = allParams[2];
                                 console.log("to - "+toDate);   
                                
                                 con.query('use CliqTimeline',function(err,rows,field) {
                                    if(!err) {
                                        console.log("no error in db");
                                    } else {
                                        //  console.log("error");
                                        console.log(err);
                                    }
                                });

                                //Fetch all tags and colors
                                tagList = [];
                                con.query('SELECT*from Tags',function(err,rows,field) {
                                    if(!err) {
                                        // console.log(rows);
                                        rows.forEach( (row) => {
                                            // console.log(`${row.Name} - ${row.Color}`);
                                            tagList.push(`${row.Name} - ${row.Color}`);
                                        });
                                    } else {
                                        //  console.log("error");
                                        console.log(err);
                                    }
                                });

                                 dataList = [];
                                 tagColor = "orange";
                                    con.query('SELECT*from Timeline where Timestamp between '+fromDate+' and '+toDate,function(err,rows,field) {
                                        if(!err) {
                                            console.log("Matching records = "+rows.length);
                                            if(rows.length==0)
                                                {
                                                    dataString = "Nomatch";
                                                }
                                            else
                                                {
                                                    timeStampList = [];
                                                    rows.forEach( (row) => {
                                                        timeStampList.push(`${row.Timestamp}`);   
                                                    });
                                                    console.log("timestamps");
                                                    console.log(timeStampList);
                                                    timeStampList.sort();
                                                    

                                                    timeStampList.forEach( (value) => {

                                                    rows.forEach( (row) => {

                                                        eventTimeStamp = `${row.Timestamp}`;
                                                        if(eventTimeStamp==value)
                                                            {
                                                                eventTag = `${row.Tag}`;
                                                                // console.log("tag name : "+eventTag);

                                                                console.log(tagList);
                                                                for(item in tagList)
                                                                    {
                                                                    if(tagList[item].includes(eventTag))
                                                                            {
                                                                                entityList = tagList[item].split(" - ");
                                                                                tagColor =  entityList[1];   
                                                                                // console.log(tagColor);
                                                                            }     
                                                                    }


                                                                // console.log(`${row.Date} ~ ${row.Data} ~ ${row.Tag} ~ ${row.Timestamp} ~ `+tagColor);
                                                                if(!dataList.includes(`${row.Date} ~ ${row.Data} ~ ${row.Tag} ~ ${row.Timestamp} ~ `+tagColor+` ~ ${row.Id}`))
                                                                    {
                                                                    dataList.push(`${row.Date} ~ ${row.Data} ~ ${row.Tag} ~ ${row.Timestamp} ~ `+tagColor+` ~ ${row.Id}`);
                                                                    }
                                                            }
                                                    });

                                                });        
                                                    
                                                    dataString = dataList.toString(",");
                                            }

                                            console.log(dataString);        
                                            response.write(dataString);
                                            response.end();
            
                                        } else {
                                            //  console.log("error");
                                            console.log(err);
                                        }
                                    });
                                }
                            else if(params.includes("eventdetailsupdate"))
                                {
                                        console.log("updating the events");
                                        con.query('use sql12329759',function(err,rows,field) {
                                            if(!err) {
                                                console.log("no error in db");
                                            } else {
                                                //  console.log("error");
                                                console.log(err);
                                            }
                                        });
                                        
                                        listOfParams = params.split("&");
                                        description = listOfParams[1];
                                        //Check and replace + across strings.
                                        description = description.replace(/\+/g," ");
                                        description = description.replace(/%20/g," ");
                                        date = listOfParams[2];
                                        //Convert date to timestamp
                                        timeStamp = new Date(date).getTime();
                                        console.log("timestamp : "+timeStamp);
                                        tag = listOfParams[3];
                                        tag = tag.replace("color=","");
                                        tag = tag.replace(/\+/g," ");
                                        tag = tag.replace(/%20/g," ");
                                        idToUpdate = listOfParams[4];
                                        console.log("desc : "+description);
                                        console.log("date :  "+date);
                                        console.log("tag : "+tag);
                                        console.log("id to update : "+idToUpdate);
                                        // var query = 'INSERT INTO Timeline(Date, Timestamp, Data, Tag) VALUES("'+date+'","'+timeStamp+'","'+description+'","'+tag+'");';
                                        var query = 'Update Timeline set Data="'+description+'", Tag="'+tag+'", Timestamp="'+timeStamp+'", Date="'+date+'"  where Id='+idToUpdate;
                                        con.query(query,function(err,rows,field) {
                                        if(!err) {
                                            response.write("Event updated successfully!");
                                            response.end();
                                        } else {
                                            response.write("Error in updating event");
                                            response.end();
                                        }
                                    });

                                }
                            else
                                {
                                //Initial page load
                                console.log("Initial page load");
                                response.writeHeader(200, {"Content-Type": "text/html"});  
                                response.write(html);  
                                response.end();  
                                }
                            }
            }
    }).listen(8080);

    // console.log(request);
});

