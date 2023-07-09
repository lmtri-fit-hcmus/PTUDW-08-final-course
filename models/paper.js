const mongoose = require('mongoose');
const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);

const stripHtml = require('string-strip-html');
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
        type: Date,
        // required: true,
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    viewCount: {
        type: Number,
        default: 0,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }],
    author_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    metadata_id: {
        type: Schema.Types.ObjectId,
        ref: "Metadata",
    },
    status: {
        type: String,
        default: 'submitted'
    },
    isPremium: {
        type: Boolean,
    },
    note: {
        type: String
    },
    approve_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    reject_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }

},
    { timestamps: true }

);

paperSchema.pre('validate', function (next) {
    if (this.metadata_id.content) {
        this.metadata_id.content = htmlPurify.sanitize(this.metadata_id.content);
        // this.snippet = stripHtml(this.metadata_id.content.substring(0, 200)).result
    }
    next();
})

module.exports = mongoose.model('Paper', paperSchema);