
const express = require('express')
const router = express.Router()
const {AddUser, GetUsers, deleteUser, PhotoController, UpdateUser, findUser} = require('../controller/UserController')
const formidable=require("express-formidable");
router.post('/adduser',formidable(),AddUser)
router.get('/getuser' ,GetUsers)
router.delete('/delete' ,deleteUser)
router.put('/updateuser/:id' ,UpdateUser)
router.get('/finduser/:id' ,findUser);
router.get("/user-photo/:id", PhotoController);


module.exports = router;