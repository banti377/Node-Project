import { modals } from "../model"
import jwt from "jsonwebtoken"
import { config } from "../config"
import bcrypt from "bcrypt"
import { sendOtp } from "../functions/emailhandler"

const creatToken = (user) => {
    return jwt.sign({ email: user.email, id: user._id }, config.secret_key)
}

export const signup = async (req, res) => {
    let input = req.body
    try {
        const match = await modals.User.findOne({
            $or: [{ email: input.email }, { contactNo: input.contactNo }]
        })
        if (match) throw new Error("email or password are used")

        let user = await modals.User.create(input)

        res.status(200).send({ success: true, data: user, token: "", message: "User create successfully" })
    } catch (error) {
        res
            .status(400)
            .send({ success: false, data: null, message: error.message })
    }
}
export const signin = async (req, res) => {
    let { email, password } = req.body

    try {
        const matchUser = await modals.User.findOne({
            $or: [{ email: email }, { contactNo: email }]
        })

        if (!matchUser) throw new Error("User not found with credetial")
        let match = await matchUser.validatePassword(password)
        if (!match) throw new Error("Email or password are not match")


        res.status(200).send({
            success: true,
            data: matchUser,
            token: creatToken(matchUser),
            message: "User create successfully"
        })
    } catch (error) {
        res
            .status(400)
            .send({ success: false, token: "", data: null, message: error.message })
    }
}

export const forgetPassword = async (req, res) => {
    let { code, newPassword } = req?.body
    try {
        const user = await modals?.User?.findOne({ code })
        if (user.code !== code) {
            return res.status(400).send("Invalid OTP")
        }
        user.password = newPassword
        await user.save()
        res.status(200).send("Password changed successfully")
    } catch (error) {
        res.status(400).send({
            success: false,
            data: null,
            message: error.messsage
        })
    }
}


export const resetPassword = async (req, res) => {
    let { newPassword, oldPassword } = req.body
    try {
        let validate = await bcrypt.compare(oldPassword, req?.me?.password)
        if (!validate) throw new Error("Old password is not match")
        req.me.password = newPassword
        req.me.save()
        res
            .status(200)
            .send({ data: null, message: "Password change success", success: true })
    } catch (error) {
        res
            .status(400)
            .send({ data: null, success: false, error: message })
    }
}

export const sendOTP = async (req, res) => {
    try {
        const matchUser = await modals?.User.findOne({ email: req?.body?.email });
        if (!matchUser) res.status(400).send("user not found with this email");
        let otp = sendOtp(matchUser.email);
        matchUser.code = otp;
        await matchUser.save();
        res.status(200).send("otp sent to your email");
    } catch (error) {
        res.status(400).send(error.message);
    }
};