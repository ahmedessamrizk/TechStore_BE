import { userModel } from "../DB/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
// dotenv.config({ path: './config/.env' })


export const InitServer = async () => {
  try {
    const user = await userModel
      .findOne({ email: process.env.adminEmail })
      .select("email");
    if (!user) {
      const hashPassword = bcrypt.hashSync(process.env.adminPassword, parseInt(process.env.SaltRound));
      const encryptPhone = jwt.sign({ phone: process.env.adminPhone }, process.env.emailToken);
      const admin = new userModel({
        firstName: process.env.adminfName,
        lastName: process.env.adminlName,
        email: process.env.adminEmail,
        password: hashPassword,
        admin: 2,
        confirmEmail: true,
        age: process.env.adminAge,
        phone: encryptPhone,
      });
      await admin.save();
      console.log("Server intiated");
    } else {
      console.log("Server is already intiated");
    }
  } catch (error) {
    console.log(error);
  }
};
