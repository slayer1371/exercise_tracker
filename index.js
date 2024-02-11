const express = require('express')
const app = express()
const bodyParser=require('body-parser')
const cors = require('cors')
require('dotenv').config()
const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://freecode:freecode@cluster0.2nnt1gx.mongodb.net/exercisetracker?retryWrites=true&w=majority')

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
app.use(bodyParser.urlencoded({extended:false}))

const userSchema=new mongoose.Schema({
  user:String
})

const exerciseSchema=new mongoose.Schema({
  _id:String,
  description:String,
  duration:Number,
  date: {type:Date,default:Date.now}
})

const Userexercises=new mongoose.model('Userexercises',exerciseSchema);

const User = new mongoose.model('User', userSchema);

app.post('/api/users',async(req,res)=>{
  const username=req.body.username

  const user=new User({
    user:username
  })

  await user.save()

  const userdoc= await User.findOne({user:username});  
  res.json({
    _id:userdoc.id,
    username:username
  });
})

app.get('/api/users',async(req,res)=>{
  const allusers= await User.find({});

    res.send(allusers); 
  })

app.post('/api/users/:_id/exercises',(req,res)=>{
  const id=req.body._id;
  const desc=req.body.description
  const duration=req.body.duration
  const date=req.body.date

  const exercise=new Userexercises({
    _id:id,
    description:desc,
    duration:duration,
    date:date
  })

  exercise.save()

  
  
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
