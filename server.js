const express=require('express')
const app=express()

const ejs=require('ejs')
const expressLayout=require('express-ejs-layouts')
const path=require('path')

const PORT=process.env.PORT || 5000

//set Template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')


//get request
app.get('/',(req,res)=>{
    res.render('home.ejs',{layout:false})  //layout false to override the global layout
})


//connect to the server
app.listen(PORT,()=>{
    console.log(`Listening at Port ${PORT}`)
})