const express = require('express')
const router = express.Router()
const {AddUser, GetUsers, deleteUser} = require('../controller/UserController')


router.post('/adduser',AddUser)
router.get('/getuser' ,GetUsers)
router.delete('/delete' ,deleteUser)
router.put('/updateuser/:id' ,GetUsers)
router.get('/finduser/:id' ,GetUsers)


module.exports = router;

