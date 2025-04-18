const express = require("express")
const mongoose = require("mongoose")
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port= 3000
const User = require("./model/user")


app.set("view engine", "ejs")

app.use(express.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://0.0.0.0:27017/SOUNDZZ')
.then(() =>{
    console.log("DATABASE IS CONNECTED ")
}).catch(()=>{
    console.log("NOT CONNECTED")
})


const path=require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'IMAGES')));
app.use(express.static(path.join(__dirname, 'AUDIO')));


var bodyParser = require('body-parser');  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
 app.post('/formex1', urlencodedParser, function (req, res) {  
 res.render('index1');  
 });  

app.get('/formex1', function (req, res) {  
res.render('index1');  
 });  

 app.get('/formex0', function (req, res) {  
    res.render('index');  
     });  
    
     app.get('/formex2', function (req, res) {  
        res.render('index2');  
         });  
        
         app.get('/formex3', function (req, res) {  
            res.render('index3');  
             });  
            

             app.get('/', function(req,res){
              console.log("Request received");
              res.render('index');
              });

              
app.listen(port,()=>{
  console.log('LISTENING to 3000')
})

             
             app.post("/index1", async function(req, res){
                try {
                    // check if the user exists
                    const user = await User.findOne({ name: req.body.name });
                    const email = await User.findOne({ name: req.body.email });
                    const dob = await User.findOne({ name: req.body.dob });
            
                    if (user) {
                      //check if password matches
                      const result = req.body.password === user.password;
                      if (result) {
                        res.render("secret");
                      } else {
                        res.status(400).json({ error: "password doesn't match" });
                      }
                    } else {
                      res.status(400).json({ error: "User doesn't exist" });
                    }
                  } catch (error) {
                    res.status(400).json({ error });
                  }
            });
              
            function isLoggedIn(req, res, next) {
                if (req.isAuthenticated()) return next();
                res.redirect("/index1");
            }
            