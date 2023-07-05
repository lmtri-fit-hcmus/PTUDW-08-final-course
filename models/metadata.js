const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const metadataSchema = new Schema(
    {
        content: {
            type: String,
        },
        avaPaper: {
            type: String,

        },
        listImg: [{
            type: String,
        }],
        listVideo: [{
            type: String,
        }],
        abstract: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Metadata", metadataSchema);




