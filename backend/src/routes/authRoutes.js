import express from 'express';
import { createUser,findUserByEmail } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

//Signup Route
router.post('/signup',async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const existingUser = await findUserByEmail(email);
        if(existingUser){
            return res.status(400).json({ message: 'Email already exists' });
        }
        await createUser(name, email, password);
    res.status(201).json({ message: 'User registered successfully' });
    }
    catch(err){
        res.status(500).json({message: 'Error creating user',error:err});
    }
});


//Login Route

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await findUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
      res.status(500).json({ message: 'Error logging in', error: err });
    }
  });
  
  export default router;
