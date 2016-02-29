/**
 * Created by RaZr0 on 06/12/2015.
 * This is the Server of our app.
 * The server is responsible for the fetching of data or sending data to the mongo data base.
 * And to handle a client that connects to the server.
 */

var express = require('express')
    , app = express()
    , http = require('http')
    , server = http.createServer(app)
    , io = require('socket.io').listen(server);

server.listen(8080);


var mongojs = require('mongojs');

var path=require('path');
//require node modules (see package.json)
var mongodb = require('mongodb');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/MyDatabase';



var addressCollection;
var screens;
var templates;
var messagesCollection;
var dataCollection;
var usersCollection;
var messagesByScreen=[];
var screenClients=[];


/**
 * Connection to the mongo server
 */
MongoClient.connect(url, function (err, db) {
        if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else
        {
                messagesCollection = db.collection('Messages');
                dataCollection = db.collection('Data');
                usersCollection=db.collection('Users');
                addressCollection=db.collection('Address');

                dataCollection.findOne(function (err, doc) {
                        screens=doc.screens;
                        templates=doc.templates;
                });

        }



});



io.sockets.on('connection',function(client){
        var screen=parseInt(client.handshake.headers.referer.split('=')[1]);

        screenClients.push({"socket":client,"screen":screen});


        messagesCollection.find({"screens.id": screen}).toArray(function (err, docs) {
                docs.forEach(function (doc) {
                        messagesByScreen.push(doc);
                });
                client.emit('data',messagesByScreen);
                messagesByScreen=[];
        });



});


/**
 * updates all the messages in the data base.
 * @param screen
 */
function sendUpdate(screen){


        function updateClients(id){
                for(var j=0;j<screenClients.length;j++) {
                        var index2=j;
                        if(screenClients[index2].screen==id) {
                                screenClients[index2].socket.emit('update', messagesByScreen);

                        }
                }
        }

        messagesCollection.find({"screens.id": screen}).toArray(function (err, docs) {
                docs.forEach(function (doc) {
                        messagesByScreen.push(doc);
                });
                updateClients(screen);
                messagesByScreen=[];
        });


}

app.use(express.static(path.dirname(__dirname)+"/client"));
app.use(express.static(path.dirname(__dirname)+"/client/css"));
app.use(express.static(path.dirname(__dirname)+"/client/templates"));
app.use(express.static(path.dirname(__dirname)+"/client/images"));
app.use(express.static(path.dirname(__dirname)+"/client/js"));
app.use(express.static(path.dirname(__dirname)+"/app"));


/**
 * get the index.html of the home module.
 */
app.get("/",function (request, response) {
        response.sendFile(path.dirname(__dirname)+"/app/views/Home/index.html");
});
/**
 * get the index.html of the manage module.
 */
app.get("/list",function (request, response) {
        response.sendFile(path.dirname(__dirname)+"/app/views/manage/index.html");
});


app.get('/screen=:id', function (request, response) {
        var id=parseInt(request.params.id);
        for(var i=0;i<screens.availableScreens.length;i++){
                if(screens.availableScreens[i].id==id){
                        response.sendFile(path.dirname(__dirname)+"/client/main.html");
                        return;
                }

        }

        response.status(404).send('Not found');


});




app.get("/getAllMessages",function (request, response) {
        messagesCollection.find().toArray(function (err, docs) {
                docs.forEach(function (doc) {
                        messagesByScreen.push(doc);
                });
                response.send(messagesByScreen);
                messagesByScreen=[];
        })
});


app.post("/findMessage",function (request, response) {

        request.on('data', function (data) {
                messagesCollection.findOne({"id": parseInt(data)}, function (err, doc) {
                        response.json(doc);
                });
        });


});

app.get("/address",function (request, response) {
        addressCollection.find().toArray(function (err, docs) {
                response.send(docs);
        })
});



app.post("/deleteMessage",function (request, response){

        request.on('data', function (data) {
                var message=JSON.parse(data);
                messagesCollection.remove({"id": message.id});
                for(var i=0;i<message.screens.length;i++){
                        var index=i;
                        sendUpdate(message.screens[index]);

                }
        });

});


/**
 * add a new message to the data base.
 */
app.post("/addMessage",function (request, response) {


        request.on('data', function (data) {
                var message=JSON.parse(data);

                messagesCollection.find().limit(1).sort({$natural: -1}).toArray(function (err, docs) {
                        if(docs.length==0)
                        {
                                message.id=1;
                                messagesCollection.insert(message);
                                for(var i=0;i<message.screens.length;i++){
                                        var index=i;
                                        sendUpdate(message.screens[index].id);

                                }

                        }
                        else {
                                docs.forEach(function (doc) {
                                        message.id = (doc.id) + 1;
                                        messagesCollection.insert(message);
                                        for(var i=0;i<message.screens.length;i++){
                                                var index=i;
                                                sendUpdate(message.screens[index].id);

                                        }
                                });
                        }
                });


        });
});

/**
 * Updates a current message in the data base.
 */
app.put('/updateMessage', function (request, response) {

        request.on('data', function (data) {
                var message=JSON.parse(data);

                messagesCollection.update(
                    { id: message.id },
                    {
                            id:message.id,
                            name: message.name,
                            text: message.text,
                            picture:message.picture,
                            link:message.link,
                            duration:message.duration,
                            time:message.time,
                            screens:message.screens
                    }
                );

                for(var i=0;i<message.screens.length;i++){
                        var index=i;
                        sendUpdate(message.screens[index].id);

                }

                if(message.updateScreens.length!=0)
                        for(var i=0;i<message.updateScreens.length;i++){
                                var index=i;
                                sendUpdate(message.updateScreens[index].id);
                        }




        });
});



app.get("/getScreensAndTemplates",function (request, response) {

        response.send({"screens":screens,"templates":templates});
});


app.post("/verifyUser",function (request, response) {

        request.on('data',function(data){
                var login=JSON.parse(data);
                usersCollection.findOne({"user": login.username,"pass":login.pass}, function (err, doc) {
                        if(doc!=null)
                                response.send("true");
                        else
                                response.send("false");

                });

        })


});


app.get("/statistics",function (request, response) {
        response.sendFile(path.dirname(__dirname)+"/app/views/statistics/index.html");
});
/**
 * This is the group by query for the statistics module.
 *
 */
app.get("/query",function (request, response) {
        messagesCollection.aggregate([

                    { $group : { _id : "$link", count: { $sum: 1 } } }
            ]
        ).toArray(function(err, result){

                response.send(result);
        });
});
