const router = require('express').Router(),
      {ensureAuthenticated,forwardAuthenticated} = require('../config/AuthConfig'),
      User = require('../model/User'),
      bcrypt = require('bcrypt'),
      upload = require('../upload/App');

// Get Data
router.get('/update', ensureAuthenticated,(req, res) => res.render('Page/update', {user: req.user}))
router.get('/profile', ensureAuthenticated,(req, res) => res.render('Page/profile', {user: req.user}))

// Update Data
router.post('/updateData', ensureAuthenticated, upload.single('profileImage') , async (req, res)=>{
    const { username, country, from, desc}= req.body
    const user = req.user;
    const profileImage = req.file.filename;

    try{
        const updateUser = await User.findByIdAndUpdate({_id: user.id}, {
            $set: req.body,
            profileImage: profileImage
        })
        res.status(200).redirect('/')
    }catch(err){
        console.log(err)
    }
})

module.exports = router;