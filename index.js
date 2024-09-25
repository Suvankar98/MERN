const express=require("express")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const ejs =  require("ejs");

const PORT = 3000
const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect('mongodb+srv://Suvankar98:Suvo221298@cluster0.rlgm3.mongodb.net/detabase')
const db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))

app.post("/sign_up",(req,res) => {
    const name= req.body.name
    const email=req.body.email
    var password=req.body.password
    var password=req.body.password

    const data={
        "name":name,
        "email":email,
        "password":password,
        "password":password
    }
    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
    })
    return res.redirect('login.html')
})

app.post("/log_in",async (req,res) => {

    try{
        const check=await  db.collection('users').findOne({email:req.body.email})
        if(check.password==req.body.password){
            return res.redirect('home.html')
        }
        else{
            res.send("Wrong Password")
        }
    }
    catch{
        res.send("Wrong Details")
    }
})

app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('index.html')
})
app.listen(3000,()=>{
    console.log(`Connected to port ${PORT}`)
})