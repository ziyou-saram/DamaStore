const express = require('express');
const bodyParser = require('body-parser');
const app = express();
mongoose = require("mongoose");
mongoose.connect(process.env.ORMONGO_URL || "mongodb://localhost:27017/DamaStore", {useNewUrlParser: true});
const port = process.env.PORT || 8080
const http = require("http")
const request = require("request")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

var schema = new mongoose.Schema({
    name : String,
    description: String,
    price: String,
    image: String
})

var clothesModel = mongoose.model("clothes", schema);

app.get("/", function (req, res) {
    clothesModel.find({}, function (err, allClothes) {
        if (err) {
            console.log(err);
        } else {
            res.render("Main", { clothes: allClothes })
        }
    })
});

app.get("/Main", function (req, res) {
    clothesModel.find({}, function (err, allClothes) {
        if (err) {
            console.log(err);
        } else {
            res.render("Main", { clothes: allClothes })
        }
    })
});

app.get("/Street", (req, res) => {
    clothesModel.find({}, function (err, allClothes) {
        if (err) {
            console.log(err);
        } else {
            res.render("Street", { clothes: allClothes })
        }
    })
});

app.get("/Casual", (req, res) => {
    clothesModel.find({}, function (err, allClothes) {
        if (err) {
            console.log(err);
        } else {
            res.render("Casual", { clothes: allClothes })
        }
    })
});

app.get("/Office", (req, res) => {
    clothesModel.find({}, function (err, allClothes) {
        if (err) {
            console.log(err);
        } else {
            res.render("Office", { clothes: allClothes })
        }
    })
});

app.get("/ProductDetail", (req, res) => {
    clothesModel.find({}, function (err, allClothes) {
        if (err) {
            console.log(err);
        } else {
            res.render("ProductDetail", { clothes: allClothes })
        }
    })
});


app.get("/Cart", (req, res) => {
    clothesModel.find({}, function (err, allClothes) {
        if (err) {
            console.log(err);
        } else {
            res.render("Cart", {clothes: allClothes})
        }
    })
});

app.listen(port, function(){
    console.log("Started up at port ${port}");
    console.log("Database_URL", process.env.ORMONGO_URL);
});