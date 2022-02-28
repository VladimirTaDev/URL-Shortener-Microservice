"use strict";

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {schema} = mongoose;
const {nanoid} = require('nanoid');
const bodyParser = require("body-parser");

const mongoDbControllers = require("./mongoDB/controllers");

const app = express();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
});

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
    res.json({greeting: 'hello API'});
});

app.post("/api/shorturl", (req, res) => {
    mongoDbControllers.shortenURL(req.body.url, (err, done) => {
        if (err) {
            console.log("Error, could not shorten url");
            res.json({error: "invalid url"});
        } else {
            res.send(done);
        }
    });
});

app.get("/api/shorturl/:shortUrlId", (req, res) => {
    mongoDbControllers.findUrlByShortId(req.params.shortUrlId, (err, done) => {
        if (err) {
            res.send("Error, no such id");
        } else {
            res.redirect(done.original_url);
        }

    });
});

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
