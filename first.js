const express = require("express");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdance');
const bodyparser = ("body-parser");
const path = require("path");
const app = express();
const port = 3000;

//app.use("/static", express.static("static"));//for serving static files//expreess related stuff
app.use(express.urlencoded());

//mongoose stated or uska stuff
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
});

const contact = mongoose.model('contact', contactSchema);

app.set("view engine", "pug");//for setting pug template engine
app.set("views", path.join(__dirname, "views"));//both pug related stuff

app.get("/", (req, res) => {
    const tosif = {}
    res.status(200).render('home.pug', tosif);
})
app.get("/contact", (req, res) => {
    const tosif = {}
    res.status(200).render('contact.pug', tosif);
})

app.post("/contact", (req, res) => {
    var mydata = new contact(require.body);
    mydata.save().then(() => {
        res.send("your data is successfully added to database");
    }).catch(() => {
        res.status(404).send("error ala re bhai");
    })
   //   res.status(200).render('contact.pug';
})


app.listen(port, () => {
    console.log(`you request is send suuccessfully on port ${port}`);
})