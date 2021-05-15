const express=require('express')
const app=express()

const ejs=require('ejs')
const expressLayout=require('express-ejs-layouts')
const path=require('path')

const PORT=process.env.PORT || 5000
// tell express where we have assets
app.use(express.static('public'))  //without this red color of css was not rendering to webpage

//set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')


//get request
app.get('/',(req,res)=>{
    res.render('home.ejs')  //{layout:false} to override the global layout but we are not using heres
})

app.get('/cart',(req,res)=>{
    res.render('customers/cart.ejs')
})

app.get('/login',(req,res)=>{
    res.render('auth/login.ejs')
})
app.get('/register',(req,res)=>{
    res.render('auth/register.ejs')
})


//connect to the server
app.listen(PORT,()=>{
    console.log(`Listening at Port ${PORT}`)
})