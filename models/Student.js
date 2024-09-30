const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const { Schema } = mongoose;

const studentSchema = new Schema({
    firstName:{type: String, required: true },
    lastName:{type: String },
    country:{type: String },
    mobileNo:{type: String },
    email:{type: String },
    password:{type: String },
    confirmPassword:{type: String },
    studentType:{type: Number , default: 2, enum: [1,2] }, //1=> For admin  and 2=> For user
    lastLogin:{ type: Date },
    createdAt:Date,
    updatedAt:Date
})


studentSchema.plugin(timestamps, { index: true });


module.exports = mongoose.model('Student', studentSchema)
