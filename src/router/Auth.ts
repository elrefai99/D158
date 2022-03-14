import express, {Request, Response} from 'express'
import User from '../model/User'

const router = express.Router();

router.get('/', (req:Request, res:Response):void=>{
    res.send("7777")
})

export default router;