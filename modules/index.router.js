import authRouter from "./auth/auth.router.js";
import userRouter from "./user/user.router.js";
import productRouter from "./product/product.router.js";
import { connectDB } from "../DB/connection.js";
import { InitServer } from "../admin/admin.js";
import express from 'express'
import cors from 'cors'

export const appRouter = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(`${process.env.BASEURL}/auth`, authRouter);
    app.use(`${process.env.BASEURL}/user`, userRouter);
    app.use(`${process.env.BASEURL}/product`, productRouter);

    connectDB();
    InitServer();


}
