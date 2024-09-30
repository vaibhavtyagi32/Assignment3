const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const { Schema } = mongoose;


const bookSchema = new Schema({
    bookTitle: { type: String, required: true },
    bookAuthor: { type: String },
    bookPublisher: { type: String },
    bookPrice: { type: Number },
    bookDescription: { type: String },
    bookLanguage:{ type: String },
    bookImage: { type: String },
    bookCategory: { type: String },
    bookStatus: { type: String },
    bookQuantity: { type: Number },
    bookRating: { type: Number },
    createdAt:Date,
    updatedAt:Date
})

bookSchema.plugin(timestamps, { index: true });


module.exports = mongoose.model('Book',bookSchema);