const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paperSchema = new Schema({
    category_id: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    viewCount: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
    },
    author_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    metadata_id: {
        type: Schema.Types.ObjectId,
        ref: "Metadata",
    },
    isPremium: {
        type: Boolean,
    },

},
    { timestamps: true }

);

module.exports = mongoose.model('Paper', paperSchema);