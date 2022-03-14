import express, {Request, Response} from 'express'
import User from '../model/User'
import * as bcrypt from 'bcrypt';
import * as JWT from 'jsonwebtoken';
const router = express.Router();

// Create Cookie
const maxAge = 3*24*60*60;
const createCookieUserId = (id: string) => {
    return JWT.sign({id}, 'net mohamed', {expiresIn: maxAge});
}
// Register
router.post('/signup',async (req:Request, res:Response)=>{
    const {username, email, password} = req.body;
    try{
        const newuser = await User.create({username, email, password})
        const token = createCookieUserId(newuser.id);
        res.cookie('__SER', token, {httpOnly: true})
        res.status(200).json(newuser)
        console.log('a7a')
    }catch(err){
        console.log(err)
    }
})

// login


export default router;