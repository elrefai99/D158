import auth from './router/Auth';
import dotenv from 'dotenv'
import express, {Application, Request, Response} from 'express'
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

const app:Application = express();
dotenv.config();

// Connect with database
const url = process.env.DATABASEURL
const port = process.env.PORT || 1999
// mongodb connection
mongoose.connect(url)
    .then(result => app.listen(1999, () => console.log(`http://localhost:${port}`))).catch(err => console.log(err))

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

// HomePage
app.get('/', (req:Request, res:Response):void => {
    res.status(200).send('welcome');
})

// Router
app.use(auth)