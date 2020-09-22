const router = require('express').Router()
const User = require('../model/User')

router.post('/register', async (req,res)=>{
  const user = new User({
    name:     req.body.name,
    email:    req.body.email,
    password: req.body.password,
  });
  
  console.log(`User Object Being sent to DB: ${user}`)
  
  try{    
    const savedUser = await user.save()
    res.send(savedUser)    

  }catch(err){
    console.log("error " + err)
    res.status(400).send(err)
  }

})

router.get('/', (req,res)=>{ res.send('Home Page of auth!') })


module.exports = router