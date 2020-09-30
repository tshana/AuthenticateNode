const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors  = require('cors')

const PORT = 5050

var authRoute = require('./routes/auth')

dotenv.config()

// Database Connection
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, ()=>console.log('Connected to DB' + process.env.another))

// Middleware
app.use(cors()) 
app.use(express.json())

// Route Middleware

app.use('/api/users', authRoute)

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))