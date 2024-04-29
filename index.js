import dotenv from 'dotenv'
// dotenv.config({ path: './config/.env' })
import express from 'express'
import * as indexRouter from './modules/index.router.js'
import cors from 'cors'
import { connectDB } from './DB/connection.js'
import { InitServer } from './admin/admin.js';

const app = express();
let port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use(`${process.env.BASEURL}/auth`, indexRouter.authRouter);
app.use(`${process.env.BASEURL}/user`, indexRouter.userRouter);
app.use(`${process.env.BASEURL}/product`, indexRouter.productRouter);

app.use('*', (req, res) => {
    return res.status(404).json({ message: 'Not Found' });
}
);

connectDB();
InitServer();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

