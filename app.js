const express = require('express');
const app = express();
const path = require('path');
const PORT = 4444;
const hbs = require('hbs');
const mongoose = require('mongoose');

// console.log(app);

// middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.use("/", require("./routes/blog"));
hbs.registerPartials(__dirname + '/views/partials');

mongoose.connect('mongodb://127.0.0.1:27017/BlogPage')
.then(()=>{
    console.log('Database connected successfully');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})


app.listen(5000,()=>{
    console.log("http://localhost:"+5000);
})

// for sending the hbs file
// app.get('/getblog', (req, res)=>{
//     res.render('blogpage', {
//         firstname: "Sumit",
//         middlename:" ",
//         lastname:"Mandal"
//     });
// });