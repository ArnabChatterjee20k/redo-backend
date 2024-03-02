import user from "../model/user.js";
import { config as dotenv } from "dotenv";
dotenv();

export const signin = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            dob,
            username,
        } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !dob || !username) {
            return res.status(200).json({
                success: false,
                message: "All fields are required",
            });
        }

        const checkUser = await user.findOne({ username: username });

        if (checkUser) {
            return res.status(200).json({
                success: false,
                message: "User already registered",
            });
        }

        if (password !== confirmPassword) {
            return res.status(200).json({
                success: false,
                message: "Password not matched",
            });
        }

        const userData = await user.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            dob: dob,
            username: username,
        }); 

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            data: userData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
