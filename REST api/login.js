var express=require('express');
var bodyParser=require('body-parser');

///////////////////////////////code by sattari

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/APA";

//////////////////////////////////////end

const site=8080;
const mongoName="Noskheban";//mongodb name is fake

//////////////////////////////////////

var app=express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

///////////////////////////////////////////////

app.post('/checkLogin',urlencodedParser,function(req,res)
{
    //check if datas are right:
    //attention: username and NC are diffrent you must check both!
    ////////////////////////////////////////coded by sattari 
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var query = {$or:[{NC:req.body.NC },{user:req.body.NC}]}; 
  db.collection(mongoName).findone(query,function(err, result) {// mongodb name is fake
    if (err) 
        res.end("false");
    else if(result.body.pass==req.body.pass)
        res.end("true");
    else
        res.end("false");
    console.log(result);
    db.close();
  });
});
    ///////////////////////////////////////end
});

/////////////////////////////////////////////

app.post('/register',urlencodedParser,function(req,res)
{
    //check data's
    //req.body.(user,pass,Fname,Lname,NC)
    //will return false if nc/username are REPETITIVE 
    //return all data's in json formatt otherwise
   MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query={$or:[{NC:req.body.NC},{user:req.body.user}]};
        db.collection(mongoName).findOne(query,function(err,result)
    {
        //here we assume that if it couldn't find anything will give us error
        if(!err)//it was exist before
            res.end('false');
           db.close();
    });
    
    var ans={
        user:req.body.user,
        pass:req.body.pass,
        Fname:req.body.Fname,
        Lname:req.body.Lname,
        Nc:req.body.NC
        //or maybe adding a userKey or something like that!
    };

    db.collection(mongoName).insertOne(ans, function(err, result) {
    if (err) throw err;
        console.log("document inserted");
    db.close();
});
    res.end(JSON.stringify(ans));
   
});
});

////////////////////////////////////////

app.listen(site,function()
{
    console.log('listening...');
})