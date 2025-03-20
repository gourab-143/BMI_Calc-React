import db from '../config/db.js'
import bcrypt from 'bcryptjs'

export const createUser = async (name,email,password) =>{
    const hashedPassword = await bcrypt.hash(password,10);
    return new Promise ((resolve,reject)=>{
        db.query(
            'INSERT INTO users (name,email,password) VALUES (?,?,?)',
            [name,email,hashedPassword],
            (err,result)=>{
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

export const findUserByEmail = (email) =>{

   return new Promise((resolve,reject)=>{
    db.query('SELECT * FROM users WHERE email = ?',[email],(err,results)=>{
        if(err) return reject(err);
        resolve(results[0]);
    })
   })
};

