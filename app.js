
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

var _ = require('lodash');
const app = express();
let allposts=[]
let allpostsTitle=[]
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let options={

}
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










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
