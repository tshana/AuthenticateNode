const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()
// Database Connection
mongoose.connect(process.env.DB_CONNECT , 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
},
()=>console.log('Connected to DB' + process.env.another))

var authRoute = require('./routes/auth')

const PORT = 5050

app.get('/',(req,res)=>{ res.send("What's up") })

app.get(/ad/,(req,res)=>{ res.send("Follwo for ads") })


app.use('/api/users', authRoute)

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))