const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Blog = require('../model/Blog');


let blogs = [];

// app.post('/addblog',(req, res)=>{
//     console.log(req.body);
// })


router.post('/addblog', async (req, res) => {
    const { name, Class, blog } = req.body;
    const obj = {
        name: name,
        Class: Class,
        blog: blog,
        blogId: uuidv4()
    }

    // console.log(obj);
    // blogs.push(obj);

    await Blog.create(obj)

    res.redirect('/getblogs')
})

// for sending an array
router.get('/getblogs', async (req, res) => {
    let blogs = await Blog.find()
    res.render('blogpage', {
        blogs: blogs
    });
});


router.get('/delete/:blogId', async (req, res) => {
    // console.log(req.params);
    // blogs = blogs.filter((item) => item.blogId != req.params.blogId)

    let blogId = req.params.blogId;
    await Blog.deleteOne({blogId});
    res.redirect('/getblogs');
});

router.get("/update/:blogId", async (req, res) => {
    // console.log("update", req.params);
    // const updateblog = blogs.filter((item) => item.blogId == req.params.blogId)

    let blogId = req.params.blogId;
    let updateblog = await Blog.findOne({blogId});
    res.render('updateblog', {
        updateblog
    });
})

router.post("/updateblog",async (req, res) => {
    const {name, Class, blog, blogId} = req.body;
    const newObj = {
        name,
        Class,
        blog,
        blogId
    };

    // blogs = blogs.map((item)=>{
    //     if(item.blogId == blogId){
    //         return newObj;
    //     }
    //     return item;
    // })

    await Blog.updateOne({blogId}, newObj)

    res.redirect('/getblogs');
})

module.exports = router;