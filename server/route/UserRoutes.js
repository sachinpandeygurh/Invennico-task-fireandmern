
const express = require('express')
const router = express.Router()
const {AddUser, GetUsers, deleteUser, PhotoController} = require('../controller/UserController')
const formidable=require("express-formidable");
router.post('/adduser',formidable(),AddUser)
router.get('/getuser' ,GetUsers)
router.delete('/delete' ,deleteUser)
router.put('/updateuser/:id' ,GetUsers)
router.get('/finduser/:id' ,GetUsers);
router.get("/user-photo/:id", PhotoController);


module.exports = router;
