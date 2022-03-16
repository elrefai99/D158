import express, { Request, Response } from 'express';
import User from '../model/User';
import bcrypt from 'bcrypt';
const router = express.Router();

// Get User
router.get('/:id', async (req:Request, res:Response) => {
    try{
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(req.params.id);
    }catch(err){
        res.status(400).json(err)
    }
})
// Update data

// Delete data

export default router;