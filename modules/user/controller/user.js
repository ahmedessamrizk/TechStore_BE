import { userModel } from './../../../DB/models/user.model.js';
import bcrypt from 'bcrypt';
import { encryptNumber } from 'encrypt-phone-numbers'
import { productModel } from './../../../DB/models/product.model.js';
import jwt from 'jsonwebtoken'

export const getUserByID = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id).select('firstName lastName');
        return user ? res.status(200).json({ message: "Done", user }) : res.status(404).json({ message: "Invalid ID" });
    } catch (error) {
        return res.status(400).json({ message: "catch error", error });
    }
}

export const getProfile = async (req, res) => {
    try {
        const id = req.user._id;
        const user = await userModel.findById(id).select('firstName lastName email admin');
        return user ? res.status(200).json({ message: "Done", user }) : res.status(404).json({ message: "Invalid ID" });
    } catch (error) {
        return res.status(400).json({ message: "catch error", error });
    }
}

export const softDeleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (req.user.admin === 2 && user.admin === 0) {
            const deleteUser = await userModel.updateOne({ _id: id }, { isDeleted: true });
            deleteUser ? res.status(200).json({ message: "Done" }) : res.status(400).json({ message: "Failed to delete" })
        } else {
            return res.status(403).json({ message: "Not authorized" });
        }
    } catch (error) {
        return res.status(400).json({ message: "catch error", error })
    }
}

export const SignOut = async (req, res) => {
    try {
        const crrDate = new Date();
        const user = await userModel.findByIdAndUpdate(req.user._id, { lastSeen: crrDate, isOnline: false }, { new: true }).select('lastSeen isOnline');
        return res.status(200).json({ message: "Done" });
    } catch (error) {
        return res.status(400).json({ message: "catch error", error })
    }
}

export const getUsers = async (req, res) => {
    try {
        if (req.user.admin >= 1) {
            const users = await userModel.find({}).select('firstName lastName email isBlocked isDeleted admin age');
            return res.status(200).json({ message: "Done", users });
        } else {
            return res.status(403).json({ message: "unAuthorized" });
        }
    } catch (error) {
        return res.status(400).json({ message: "catch error", error });
        console.log(error);
    }
}

export const blockUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id).select('id');
        if (!user.admin && req.user.admin == 2) {
            const blockedUser = await userModel.updateOne({ _id: id }, { isBlocked: true });
            blockedUser.modifiedCount ? res.status(200).json({ message: "Done" }) : res.status(400).json({ message: "Already Blocked" });
        } else {
            return res.status(401).json({ message: "unAuthorized" });
        }
    } catch (error) {
        return res.status(400).json({ message: "catch error", error })
    }
}

export const makeAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { adminValue } = req.body;
        if (req.user.admin === 2) {
            const updateUser = await userModel.findByIdAndUpdate(id, { admin: adminValue }, { new: true }).select('admin');
            return updateUser ? res.status(200).json({ message: "Done" }) : res.status(400).json({ message: "Failed to update" });
        } else {
            return res.status(403).json({ message: "unAuthorized" });
        }
    }
    catch (error) {
        return res.status(400).json({ message: "catch error", error })
    }
}