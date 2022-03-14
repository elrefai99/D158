import auth from './router/Auth';
import dotenv from 'dotenv'
import express, {Request, Response} from 'express'
const app = express();

dotenv.config();
app.use(auth)

app.listen(process.env.PORT,():void =>{
    console.log('tt')
})