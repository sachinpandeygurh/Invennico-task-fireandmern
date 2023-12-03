const express = require('express')
const router = express.Router()

const {registerUser,login, updateAdmin} = require('../controller/AdminController')



router.post('/register',registerUser)
router.post('/login',login)

router.put('/update',updateAdmin)



module.exports = router;

