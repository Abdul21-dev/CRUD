const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require('method-override')

app.use(methodOverride('_method'))

uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname, "/public")));

app.listen(port, ()=>{
    console.log(`App is listening to port ${port}`);
});

let posts = [
    {
        id: uuidv4(),
        username: "abdulrahman",
        content: "Believe in yourself"
    },

    {
        id: uuidv4(),
        username: "viratkohli",
        content: "I love cricket"
    },

    {
        id: uuidv4(),
        username: "apnacollege",
        content: "coding is LOVE"
    }
]

app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
})

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
})

app.post("/posts", (req, res)=>{
    let { username, content } = req.body ;
    let id = uuidv4();
    posts.push({ id, username, content});
    res.redirect("/posts");
})

app.get("/posts/:id", (req, res)=>{
    let { id } = req.params;
    const post = posts.find((p)=> id === p.id);
    res.render("show.ejs", { post });
})

app.patch("/posts/:id", (req, res)=>{
    let { id } = req.params;
    const post = posts.find((p)=> id === p.id);
    let newContent = req.body.content;
    post.content = newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req, res)=>{
    let { id } = req.params;
    const post = posts.find((p)=> id === p.id);
    res.render("edit.ejs", {post});
})

app.delete("/posts/:id", (req, res)=>{
     let { id } = req.params;
     posts = posts.filter((p)=> id !== p.id);
     res.redirect("/posts");
})