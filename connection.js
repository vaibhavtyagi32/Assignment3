const mongoose = require('mongoose');
  
module.exports = async function connextion() {
    try{
        await mongoose.connect('mongodb://localhost:27017/AssignmentData')
        console.log('Connected to MongoDB');
    }catch(error){
        console.log(error,'error');
    }
  }