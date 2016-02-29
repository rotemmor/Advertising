/**
 * Created by RaZr0 on 06/12/2015.
 * This is our data base of adverts .
 * stored inside of mongo db.
 */


var images1 =["mac1.jpg","mac2.jpg"];
var textArray1 =["Big Mac","A double layer of sear-sizzled 100% pure beef mingled with special sauce on a sesame seed bun and topped with melty American cheese, crisp lettuce, minced onions and tangy pickles.","Chicken McNuggets","Our tender, juicy, Chicken McNuggets are made with USDA-inspected white meat. They're tempura battered and cooked to golden perfection. Step up the fun with your choice of our delectable dipping sauces."];

var images2 =["subway.jpg"];
var textArray2 =["Sweet Onion Chicken Teriyaki","This gourmet specialty is a flavorful blend of tender","teriyaki glazed chicken strips and our ","own fat-free sweet onion sauce.","Served hot & toasted on freshly baked bread, ","Mike Trout calls this protein-packed power hitter his","favorite sub.","And with a taste so big, ","you wont believe it has less than 6g of fat!","Yummy!!"];

var images3 =[];
var textArray3 =[];

var images4 =[];
var textArray4 =["Selling an old dell laptop for 50$. Model: 466cd-731549","Call me: 050-432-7846"];

var images5 =["pizzahut1.jpg","pizzahut2.jpg"];
var textArray5 =["Pizza Hut","Pizza Hut is an American restaurant chain and international franchise,","known for pizza and side dishes. It is now corporately known as Pizza Hut, Inc.","and is a subsidiary of Yum! Brands, Inc., the world's largest restaurant company.","In 2015, the company had more than 6,000 Pizza Hut restaurants in the United States,","and 5,139 store locations in 94 other countries and territories worldwide.","Pizza Hut has a total of 11,139 branches worldwide."];



var daysAndHours1=[{"day":1,"startHour":8,"endHour":22},{"day":2,"startHour":8,"endHour":22},{"day":3,"startHour":8,"endHour":22},{"day":4,"startHour":8,"endHour":22},{"day":5,"startHour":8,"endHour":22},{"day":1,"startHour":6,"endHour":22},{"day":7,"startHour":8,"endHour":22}];
var daysAndHours2=[{"day":1,"startHour":8,"endHour":22},{"day":2,"startHour":8,"endHour":22},{"day":3,"startHour":8,"endHour":22},{"day":4,"startHour":8,"endHour":22},{"day":5,"startHour":8,"endHour":22},{"day":1,"startHour":6,"endHour":22},{"day":7,"startHour":8,"endHour":22}];
var daysAndHours3=[{"day":1,"startHour":8,"endHour":22},{"day":2,"startHour":8,"endHour":22},{"day":3,"startHour":8,"endHour":22},{"day":4,"startHour":8,"endHour":22},{"day":5,"startHour":8,"endHour":22},{"day":1,"startHour":6,"endHour":22},{"day":7,"startHour":8,"endHour":22}];
var daysAndHours4=[{"day":1,"startHour":8,"endHour":22},{"day":2,"startHour":8,"endHour":22},{"day":3,"startHour":8,"endHour":22},{"day":4,"startHour":8,"endHour":22},{"day":5,"startHour":8,"endHour":22},{"day":1,"startHour":6,"endHour":22},{"day":7,"startHour":8,"endHour":22}];
var daysAndHours5=[{"day":1,"startHour":8,"endHour":22},{"day":2,"startHour":8,"endHour":22},{"day":3,"startHour":8,"endHour":22},{"day":4,"startHour":8,"endHour":22},{"day":5,"startHour":8,"endHour":22},{"day":1,"startHour":6,"endHour":22},{"day":7,"startHour":8,"endHour":22}];



var advertTime1= {"startDate":"2016-01-01","endDate":"2016-12-12","hoursByDay":daysAndHours1};
var advertTime2= {"startDate":"2016-01-01","endDate":"2016-12-12","hoursByDay":daysAndHours2};
var advertTime3= {"startDate":"2016-01-01","endDate":"2016-12-12","hoursByDay":daysAndHours3};
var advertTime4= {"startDate":"2016-01-01","endDate":"2016-12-12","hoursByDay":daysAndHours4};
var advertTime5= {"startDate":"2016-01-01","endDate":"2016-12-12","hoursByDay":daysAndHours5};

var messages =
    [
        { "id": 1 , "name" : "message1", "text":  textArray1,"picture" : images1,"link":"tmp1.html","duration":2000,"time":advertTime1,"screens": [{id:1},{id:2}]},
        { "id": 2 , "name" : "message2", "text": textArray2,"picture" : images2,"link":"tmp2.html","duration":2000,"time":advertTime2,"screens":[{id:1},{id:3}]},
        { "id": 3 , "name" : "message3", "text": textArray3,"picture" : images3,"link":"tmp3.html","duration":2000,"time":advertTime3,"screens":[{id:2},{id:3}]},
        { "id": 4 , "name" : "message4", "text": textArray4,"picture" : images4,"link":"tmp1.html","duration":2000,"time":advertTime4,"screens":[{id:1}]},
        { "id": 5 , "name" : "message5", "text": textArray5,"picture" : images5,"link":"tmp2.html","duration":2000,"time":advertTime5,"screens":[{id:3}]}
    ];




var user={"user":"Admin","pass":"123456"};

var screensAndTemplates={
    "screens" : {
        "availableScreens" : [
            {
                "id" : 1,
                "name" : "Screen 1"
            },
            {
                "id" : 2,
                "name" : "Screen 2"
            },
            {
                "id" : 3,
                "name" : "Screen 3"
            }
        ]
    },
    "templates" : {
        "availableTemplates" : [
            {
                "id" : "tmp1.html",
                "name" : "Template A"
            },
            {
                "id" : "tmp2.html",
                "name" : "Template B"
            },
            {
                "id" : "tmp3.html",
                "name" : "Template C"
            }
        ]
    }
};


var address =
    [
        { "address": 1 , "name" : "Elie Wiesel St 2,Rishon LeTsiyon,Israel"},
        { "address": 2 , "name" : "Sderot Yitshak Rabin,Rishon LeTsiyon,Israel"}
    ];



//require node modules (see package.json)
var mongodb = require('mongodb');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/MyDatabase';

MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    }

    var usersCollection = db.collection('Users');
    var messagesCollection = db.collection('Messages');
    var addressCollection = db.collection('Address');
    var dataCollection = db.collection('Data');



    usersCollection.insert(user);
    messagesCollection.insert(messages);
    addressCollection.insert(address);
    dataCollection.insert(screensAndTemplates);


    db.close();



});
