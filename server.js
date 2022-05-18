const express = require('express');
const bodyParser = require('body-parser');
const app = express();
mongoose = require("mongoose");
mongoose.connect(process.env.ORMONGO_URL || "mongodb://localhost:27017/DamaStore", {useNewUrlParser: true});
const port = process.env.PORT || 8080
const http = require("http")
const request = require("request")

const extendTimeoutMiddleware = (req, res, next) => {
    const space = ' ';
    let isFinished = false;
    let isDataSent = false;

    // Only extend the timeout for API requests
    if (!req.url.includes('/api')) {
        next();
        return;
    }

    res.once('finish', () => {
        isFinished = true;
    });

    res.once('end', () => {
        isFinished = true;
    });

    res.once('close', () => {
        isFinished = true;
    });

    res.on('data', (data) => {
        // Look for something other than our blank space to indicate that real
        // data is now being sent back to the client.
        if (data !== space) {
            isDataSent = true;
        }
    });

    const waitAndSend = () => {
        setTimeout(() => {
            // If the response hasn't finished and hasn't sent any data back....
            if (!isFinished && !isDataSent) {
                // Need to write the status code/headers if they haven't been sent yet.
                if (!res.headersSent) {
                    res.writeHead(202);
                }

                res.write(space);

                // Wait another 15 seconds
                waitAndSend();
            }
        }, 15000);
    };

    waitAndSend();
    next();
};

app.use(extendTimeoutMiddleware);
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