import authRouter from "./auth/auth.router.js";
import userRouter from "./user/user.router.js";
import productRouter from "./product/product.router.js";
import { connectDB } from "../DB/connection.js";
import { InitServer } from "../admin/admin.js";
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config({ path: './config/.env' })

export const appRouter = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
    app.use(cors());

    app.use(`api/v1/auth`, authRouter);
    app.use(`api/v1/user`, userRouter);
    app.use(`api/v1/product`, productRouter);

    app.use('*', (req, res) => {
        return res.status(404).json({ message: 'Not Found' });
    }
    );

    connectDB();
    InitServer();


}
