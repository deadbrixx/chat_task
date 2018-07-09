
var db;
var dbconnection = 'mongodb://ashish:mapnchat1@ds129831.mlab.com:29831/mapnchat';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(dbconnection, (err, database) => {
    if (err) {
        return console.log(err);
    }
    db = database;
    app.listen(3000, () => {
        console.log('Mongo listening on 3000');
    });
});

function databaseStore(message, timeStamp) {
    var storeData = {
        chatMessage: message,
        timeStamp: timeStamp
    };
    db.collection('chatroom-chats').save(storeData, (err, result) => {
        if (err) {
            return console.log(err);
        }
        console.log('saved to database');
    });
}

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html')
    res.send('Chat Server');
});


io.on('connection', (socket) => {

    console.log('user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('add-message', (message) => {
        var timeStamp = new Date().getTime();
        io.emit('message', {
            type: 'new-message',
            text: message,
            date: timeStamp
        });
        // Function above that stores the message in the database
        databaseStore(message, timeStamp);
    });

});

var groupfile = require('./server_modules/add_group');
app.use('/gapi', groupfile); 


http.listen(5000, () => {
    console.log('Server started on port 5000');
});