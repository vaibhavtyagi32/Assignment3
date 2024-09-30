const Student = require('../models/Student');
const bcrypt = require('bcrypt');
const saltRound = 10;

async function createAdmin(){
    try{
        let password = bcrypt.hashSync('12345', saltRound);
        let adminData = {
            firstName:'Admin',
            email:'admin@rdec.in',
            password:password,
            studentType:1
        }

        let user = new Student(adminData);
        await user.save(); 
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    createAdmin
}