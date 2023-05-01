const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const homeStartContent = "In this updated example, the .container element uses grid-auto-flow: column to specify that the items should be displayed in a column flow, regardless of the available width. The grid-template-columns property is set to repeat(auto-fill, minmax(200px, 1fr)) to create a grid with columns that have a minimum width of 200px and expand to fill the available space. This will ensure that the first two elements are displayed side by side in two columns."

const posts = [];
const contacts = [];

app.get("/", function (req, res) {
  res.render("home", {postBody: homeStartContent, postData: posts});
});

app.get("/compose", function(req, res){
    res.render("compose");
})

app.post("/compose", function(req, res){

    const post = {
        title: req.body.composeTitle,
        content: req.body.composeBody,
    }
    posts.push(post);

    res.redirect("/");

});

app.get("/contact", function(req, res){
    res.render("contact");
});

app.post("/contact", function(req, res){

    const contact = {
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
    }
    contacts.push(contact);
    res.redirect("/");
});

app.get("/about", function(req, res){
    res.render("about");
});

app.get("/posts/:title", function(req, res){

    const kebTitle = _.lowerCase(req.params.title);

    posts.forEach((post) => {
        const kebPostTitle = _.lowerCase(post.title);
        if(kebTitle === kebPostTitle) {
            res.render("post", {postTitle: post.title, postContent: post.content});
        }
    });

});

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
