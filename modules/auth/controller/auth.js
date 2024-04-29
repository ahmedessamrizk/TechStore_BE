import { userModel } from './../../../DB/models/user.model.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv'
// dotenv.config({ path: './config/.env' })


export const SignUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password, age, phone, gender, address } = req.body;
        const checkUser = await userModel.findOne({ email }).select('email');
        if (checkUser) {
            return res.status(409).json({ message: "Email Exist" });
        } else {
            const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SaltRound));
            const encryptPhone = jwt.sign({ phone: phone }, process.env.emailToken);
            const newUser = new userModel({ firstName, lastName, email, password: hashPassword, age, phone: encryptPhone, gender, address });
            const savedUser = await newUser.save();
            return res.status(200).json({ message: "Done" });
        }
    } catch (error) {
        return res.status(400).json({ message: "catch error", error });
    }
}

export const SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkEmail = await userModel.findOne({ email });
        if (checkEmail) {
            if (checkEmail.isDeleted == false && checkEmail.isBlocked == false) {
                const match = bcrypt.compareSync(password, checkEmail.password);
                if (match) {
                    const user = await userModel.findByIdAndUpdate(checkEmail._id, { isOnline: true }, { new: true });
                    const token = jwt.sign({ id: user._id }, process.env.emailToken, { expiresIn: '24h' });
                    return res.status(200).json({ message: "Done", token });
                } else {
                    return res.status(403).json({ message: "email Password misMatch" });
                }

            } else {
                return res.status(403).json({ message: "Account has been deleted or blocked" });
            }
        } else {
            return res.status(403).json({ message: "email Password misMatch" });
        }

    } catch (error) {
        return res.status(400).json({ message: "catch error", error });
    }
}

