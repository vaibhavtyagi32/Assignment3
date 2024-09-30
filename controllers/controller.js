const bcrypt = require('bcrypt');
const Student  = require('../models/Student');
// const Admin = require('../models/Admin');
const Book = require('../models/Book');
const saltRound = 10;


async function signup(req, res) {
    try{
        //first we need to check wheather email already exist
        console.log(req.body.email)
        let userExists = await Student.findOne({email:req.body.email});
        if(userExists){
            return res.status(400).json({message:"Email already exist"});
        }
        else{
            console.log('Recieved form data',req.body); //Log the form data
            let encryptpassword = bcrypt.hashSync(req.body.password, saltRound);
            console.log(encryptpassword);
            const response = new Student(req.body);
            response.studentType=2;
            response.password = encryptpassword;
            await response.save();
            console.log('data added sucessfully');
            res.render('home'); 
        }
        
    }catch(error){
        console.log(error,'error');
    }
}


async function login(req, res) {
    try{ 
         const email = req.body.email;
         const password = req.body.password;
         const student = await Student.findOne({ email: email,});
         if(!student){
            res.end("<h1> User doesnt Exists</h1>")
         }else{
             console.log(student.password,"pw");//encrypted
             console.log(req.body.password,"entered password");//typed
            let isMatch = bcrypt.compare(password, student.password);
            if(isMatch){
                if(student.studentType==1){//for Admin
                    const book = await Book.find({});
                    console.log(book);
                    res.render('admindashboard',{book:book});
                     
                }
                else{//for normal user
                    res.render('userdashboard');
                }
                
            }
            else{
                res.end("<h1> Incorrect Password</h1>")
            }
         }

        }catch(error){
            console.log(error,'error');
        }
}





async function getuser(req, res){
    try{
        const users = await  Student.find({studentType:2})
        if(users){
           res.render('userslist',{users:users})
        }
        else{
            console.log('no users');
        }
    }catch(error){
        console.log(error,'error');
    }
}



async function getStudentForEdit(req, res) {
    try{
         const id = req.params.id;
         const user = await Student.findOne({_id:id});
         if(user){
            console.log(user);
            res.render('userforupdate',{user:user});
         }
         else{
            console.log('no user found');
         }
    }catch(error){
        console.log(error,'error');
    }
}


async function updateuser(req, res) {
    try{
        const id = req.params.id;
        let user = await Student.findOne({_id:id})
        if(user){
            user.firstName=req.body.firstName;
            user.lastName=req.body.lastName;
            user.country=req.body.country;
            user.email=req.body.email;
            user.mobileNo=req.body.mobileNo;
            user.password=req.body.password;
            user.confirmPassword=req.body.confirmPassword;
            await user.save();
            console.log('user updated');
            const users = await Student.find({});
            res.render('userslist',{users:users})
        }
    }catch(error){
        console.log(error,'error')
    }
}


async function deleteuser(req, res){
    try{
        const id = req.params.id;
        const user = await Student.deleteOne({_id:id});
        if(user){
            const users = await Student.find({});
            res.render('userslist',{users:users})
        }else{
            console.log('No more users')
        }
    }catch(error){
        console.log(error,'error')
    }
    
}

async function bookform(req, res){
    try{
        res.render('bookform');   
    }catch(error){
        console.log(error,'error')
    }
}

async function addnewbook(req, res){
    try{
        const newbook = new Book(req.body)
        await newbook.save();
        console.log('book added sucessfully');
        const book = await Book.find({})
        res.render('updatedbooklist',{book:book});
         
    }catch(error){
        console.log(error,'error')
    }
}


async function getallbooks(req, res){
    try{
         const book = await Book.find({});
         res.render('updatedbooklist',{book:book});
    }
    catch(error){
        console.log(error,'error')
    }
}

async function getadmindashboard(req, res){
    try{
        const book = await Book.find({})
        res.render('updatedbooklist',{book:book});
    }catch(error){
        console.log(error,'error')
    }
    
}



async function getbookforEdit(req, res){
    try{
        let id = req.params.id;
        let books = await Book.findOne({_id:id});
        res.render('editbook',{book:books});
    }catch(error){
        console.log(error,'error')
    }    
}

async function updatebook(req, res ){
    try{
        let id = req.params.id;
        console.log(id);
        const book = await Book.findOne({_id:id});
        if(book){
        console.log('find book by id')
        console.log(book)
        book.bookAuthor=req.body.bookAuthor;
        book.bookImage=req.body.bookImage;
        book.bookTitle=req.body.bookTitle;
        book.bookDescription=req.body.bookDescription;
        book.bookPrice=req.body.bookPrice;
        book.bookPublisher=req.body.bookPublisher;
        book.bookCategory=req.body.bookCategory;
        book.bookQuantity=req.body.bookQuantity;
        book.bookRating=req.body.bookRating;
        book.bookStatus=req.body.bookStatus;
        await book.save();
        const books = await Book.find({})
        res.render('updatedbooklist',{book:books});
        }
        else{
            console.log('book not found')
        }
    }catch(error){
        console.log(error,'error')
    }
    
}

async function deletebook(req , res ){
    try{
        let id = req.params.id;
        const book = await Book.findOneAndDelete({_id:id});
        const books = await Book.find({})
        res.render('updatedbooklist',{book:books});
    }catch(error){
        console.log(error,'error')
    }
    
}


module.exports = {
    signup,
    login,
    getuser,
    getStudentForEdit,
    updateuser,
    deleteuser,
    bookform,
    addnewbook,
    getallbooks,
    getadmindashboard,
    updatebook,
    getbookforEdit,
    deletebook
}