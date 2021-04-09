
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Welcome to our Blogging Site start creating and uploading interesting content";
const aboutContent = "We created this website for you to read amazing content daily";

var _ = require('lodash');
const app = express();
let allposts=[]
let allpostsTitle=[]
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function (req,res) {
    res.render("home",{startContent:homeStartingContent,written:allposts})
    
})
app.get("/about",function (req,res) {
    res.render("about",{aboutcOntent:aboutContent})
})
app.get("/compose",function (req,res) {
  res.render("compose")
})
app.get('/posts/:topic', function (req, res) {
    var currtopic=_.lowerCase(req.params.topic)
    
  for (let i = 0; i<allposts.length ; i++) {
    if (_.lowerCase(allposts[i].title)===currtopic) {
        
        res.render("post",{titleOfPost:allposts[i].title,contentOfPost:allposts[i].content,topicdisplay:currtopic})
   
    }
  }

})

    app.post("/compose",function (req,res) {
    const posts={
      title:req.body.postTitle,
      content:req.body.postBody

    };
   
    allposts.push(posts)
  
    res.redirect("/")
})







let port = process.env.PORT;


app.listen(port, function() {
  console.log("Server started on port 3000");
});
