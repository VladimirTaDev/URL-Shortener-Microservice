"use strict";

const mongoose = require("mongoose");
const {Schema} = mongoose;

const ShortenedUrlSchema = new Schema({
    original_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        required: true
    }
});

// Exports.
module.exports.ShortenedUrl = mongoose.model("ShortenedUrl", ShortenedUrlSchema);