"use strict";

const {nanoid} = require('nanoid');
const models = require("../mongoDB/models");
const {isURL} = require("validator");

const shortenURL = (url, done) => {
    const isValidUrl = isURL(url);

    if (isValidUrl) {
        const shortUrl = new models.ShortenedUrl({
            original_url: url,
            short_url: nanoid(4)
        });

        shortUrl.save((err, data) => {
            if (err) {
                return done(err);
            }
            done(null, data);
        });
    } else {
        return done("Error, url not valid.");
    }
};

const findUrlByShortId = (shortId, done) => {
    models.ShortenedUrl.findOne({short_url: shortId}, (err, data) => {
        if (err || data === null) {
            return done(err || "Error, could not retrieve data");
        } else {
            return done(null, data);
        }
    });
};

// Exports.
module.exports = {
    shortenURL,
    findUrlByShortId
};