const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller')
router.use(express.urlencoded({extended: false}));



router.get('/',(req, res)=>{
    res.render('home')
})


router.post('/signup',(req, res)=>{
    Controller.signup(req, res);
})

router.post('/login',(req, res)=>{
    Controller.login(req, res);
})

router.get('/admin',(req, res)=>{
    Controller.admin(req, res);
})

router.get('/adminpage',(req, res)=>{
    Controller.adminpage(req, res);
})

router.get('/getuser',(req, res)=>{
    Controller.getuser(req, res);
})

router.get('/edit/user/page/:id',(req, res)=>{
    Controller.getStudentForEdit(req, res);
})

router.post('/update/user/:id',(req, res)=>{
    Controller.updateuser(req, res);
})

router.get('/delete/user/page/:id',(req, res)=>{
    Controller.deleteuser(req, res);
})

router.get('/bookform',(req, res)=>{
    Controller.bookform(req, res);
})

router.post('/add/new/book',(req, res)=>{
    Controller.addnewbook(req, res);
})

router.get('/getallbooks',(req, res)=>{
    Controller.getallbooks(req, res);
})

router.get('/getadmindashboard',(req, res)=>{
    Controller.getadmindashboard(req, res);
})

router.get('/edit/book/page/:id',(req , res)=>{
    Controller.getbookforEdit(req, res);
})

router.post('/updated/book/page/:id',(req, res)=>{
    Controller.updatebook(req, res);
})

router.get('/delete/book/page/:id',(req, res)=>{
    Controller.deletebook(req, res);
})

module.exports =router