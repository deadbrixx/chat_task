var express = require("express");
var mongodb = require("mongojs");
var db_connection = mongodb("mongodb://ashish:mapnchat1@ds129831.mlab.com:29831/mapnchat");
var router = express.Router();

router.post("/creategroup", function(req, res){
    var group_data = req.body.groupname;
    console.log(group_data);
    db_connection.group.find({},{_id:1}).sort({_id:-1}).limit(1,function(err, result){
          if(result == 0){
           grid = 0;
          } else {
           grid = result[0]._id;
          }
           grid++;

    db_connection.group.save({_id:grid, grpname:group_data, grpactive:1}, function(error, result){
        if(error) throw error;
        else{
            res.send("Group Created");
        }
    });
  });
});

router.get("/getgroup", function(req, res){
    db_connection.group.find(function(error, result){
        console.log(result);
        res.send(result);
    });
});

router.post("/deletegroup", function(req, res){
    var del = req.body;
    console.log(del);
    db_connection.group.remove({_id: del._id}, function(error, result){
        console.log(result);
        res.send(result);
    });
});

module.exports = router;