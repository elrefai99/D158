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
    }catch(err){
        res.status(400).json(err)
    }
})

// login
router.post('/signin', async(req:Request, res:Response)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user) res.status(400).json('user not found')

        const password = await bcrypt.compare(req.body.password, user.password)
        if(!password) res.status(400).json("wrong password")

        
        res.status(200).json('Welcome')
    }catch(err){
        res.status(400).json(err)
    }
})

export default router;