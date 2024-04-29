import dotenv from 'dotenv'
dotenv.config({ path: './config/.env' })
import express from 'express'
import * as indexRouter from './modules/index.router.js'



const app = express();
const port = process.env.port;

indexRouter.appRouter(app)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

