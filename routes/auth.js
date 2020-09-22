const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req,res)=>{
  // Validate data before entering into DB
  const { error } = registerValidation(req.body)
  
  if(error) return res.status(400).send(error.details[0].message);
  
  // Check if user exists 
  const emailExists = await  User.findOne({email: req.body.email})
  if(emailExists) return res.status(400).send("Email already exists")

  // Hash passwords
  const salt           = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    name:     req.body.name,
    email:    req.body.email,
    password: hashedPassword,
  });
  
  // console.log(`User Object Being sent to DB: ${user}`)
  
  try{    
    const savedUser = await user.save()
    res.status(200).send({user: savedUser.id, email: savedUser.email})
  }
  catch(err){ res.status(400).send(`An error occured: ${err}`)}

})

router.get('/', (req,res) => { res.send('Home Page of auth!') })


router.post('/login', async (req,res) => {
  const { error } = loginValidation(req.body)
  
  if(error) return res.status(400).send(error.details[0].message);
  
  // Check if email exists 
  const user = await  User.findOne({email: req.body.email})

  if(!user) return res.status(400).send("Email doesn't exist")
  
  const validPass = await bcrypt.compare(req.body.password, user.password)

  if(!validPass){  return res.send('Password is incorrect') }
  
  res.send('Welcome in pomp')


})


module.exports = router