const router = require('express').Router(),
      Post = require('../model/Posts'),
      {ensureAuthenticated,forwardAuthenticated} = require('../config/AuthConfig'),
      Upload = require('../upload/App');


// Get Post Page
router.get('/post', ensureAuthenticated, (req, res)=> res.render('Page/post', {user: req.user}))

// Upload Post
router.post('/UploadPost', ensureAuthenticated, Upload.single('img'), async (req, res) => {
    const userId = req.user.id
    const img = req.file.filename;
    const desc = req.body.desc;
    const username = req.user.username;

    try{
        const UploadPost = await Post({
            userId,
            img,
            desc,
            username
        })
        const SavePost = await UploadPost.save();
        res.status(200).redirect('/')
    }catch(err){
        console.log(err)
    }

})

// update
router.post('/updatePost/:id', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    const img = req.file.filename;
    const desc = req.body.desc;
    const username = req.user.username;

    try{
        const updatePost = await Post.findByIdAndUpdate({_id: req.params.id},{
            desc,
        })
        const SavePost = await updatePost.save();
        res.status(200).redirect('/')
    }catch(err){
        console.log(err)
    }
})

// delete Post
router.post('/deletePost/:id',ensureAuthenticated, async (req, res)=>{
    try{
        const user_id = req.user.id;
        const deletePosts = await Post.findById(req.params.id)
            if(deletePosts.userId === user_id){
                await result.deleteOne();
                res.status(200).redirect('/')
            }
    }catch(err){
        console.log(err)
    }
})
module.exports = router