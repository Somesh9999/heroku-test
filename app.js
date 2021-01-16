const express= require('express');
const bodyParser= require('body-parser');
const postRoutes= require('./routes/posts');
const userRoutes= require('./routes/users');
const path=require('path');

const mongoose= require('mongoose');

const app= express();

mongoose.connect("mongodb+srv://somesh:"+process.env.MONGO_ATLAS_PW+"@cluster0.fn5lq.mongodb.net/node-angular?retryWrites=true&w=majority").then(()=>{
  console.log("Connected Successfully");
}).catch(()=>{
  console.log("Connection Failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images",express.static(path.join("images"))); //Used to provide access to images folder of our backend folder

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With , Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();

});

app.use("/",(req,res,next)=>{
  res.end("Sucess");
})
app.use('/api/posts',postRoutes);
app.use('/api/users',userRoutes);

module.exports=app;
