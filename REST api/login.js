var express=require('express');
var bodyParser=require('body-parser');
///////////////////////////////code by sattari
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/APA";
//////////////////////////////////////end
const site=8080;

var app=express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//add an app.use(....) or something like that about database

app.post('/checkLogin',urlencodedParser,function(req,res)
{
    //check if datas are right:
    //attention: username and NC are diffrent you must check both!
    ////////////////////////////////////////coded by sattari 
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var query = { /**/ }; 
  db.collection("Noskheban").findone(query,function(err, result) {// query name is fake
    if (err) throw err;// dorost shavad
    console.log(result);
    db.close();
  });
});
    ///////////////////////////////////////end
    /////////////////////////////////
    //ina alakian va badan dorost mishan:
    if(req.body.NC=='parto' && req.body.pass==222)
    /////////////////////////////////
        res.end("true");
    else
        res.end("false");
});

app.post('/register',urlencodedParser,function(req,res)
{
    //check data's
    //req.body.(user,pass,Fname,Lname,NC)
    //will return false if nc/username are REPETITIVE 
    //return all data's in json formatt otherwise
    ///////////////////////
   
    //tekrari bood:
    if(req.body.NC=='parto')
    //////////////////////
        res.end('false');
    else
        var ans={
            user:req.body.user,
            pass:req.body.pass,
            Fname:req.body.Fname,
            Lname:req.body.Lname,
            Nc:req.body.NC
            //or maybe adding a userKey or something like that!
        };
        res.end(JSON.stringify(ans));
});

app.listen(site,function()
{
    console.log('listening...');
})