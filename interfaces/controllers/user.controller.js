import bcryptjs from 'bcryptjs'
import {config} from "dotenv";
import jwt from "jsonwebtoken";
import {saveImage} from "../../utils/uploadImageLocal.js";
import sendEmail from "../../config/sendEmail.js";
import verifyEmailTemplate from "../../utils/verifyEmailTemplate.js";
import forgotPasswordTemplate from "../../utils/forgotPasswordTemplate.js";

config();

const userController = (userUseCase) => ({
    login: async (req, res) => {
        try {
            const {email, password} = req.body;

            const user = await userUseCase.getByEmail(email);

            if (!user) {
                return res.status(400).json({status: 'error', message: "Invalid email or password"})
            }

            if (user.status !== "Active") {
                return res.status(400).json({
                    status: 'error',
                    message: "Your account is not active. Contact the administrator."
                })
            }

            const checkPassword = await bcryptjs.compare(password, user.password)

            if (!checkPassword) {
                return res.status(400).json({status: 'error', message: "Invalid email or password"})
            }

            await userUseCase.findIdAndUpdate(user?._id, {last_login_date: new Date()})

            const accessToken = await jwt.sign(
                {id: user._id},
                process.env.SECRET_KEY_ACCESS_TOKEN,
                {expiresIn: '5h'}
            )

            const refreshToken = await jwt.sign(
                {id: user._id},
                process.env.SECRET_KEY_REFRESH_TOKEN,
                {expiresIn: '7d'}
            )

            await userUseCase.update({_id: user._id}, {refresh_token: refreshToken})

            const cookiesOption = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
            };

            res.cookie('accessToken', accessToken, cookiesOption)
            res.cookie('refreshToken', refreshToken, cookiesOption)

            return res.status(201).json({
                status: "success",
                data: {accessToken: accessToken},
                message: "Login successfully",
            })
        } catch (e) {
            return res.status(500).json({status: "error", message: e.message});
        }
    },
    register: async (req, res) => {
        try {
            const {email, password, name} = req.body;

            const user = await userUseCase.getByEmail(email);

            if (user) {
                return res.status(400).json({status: 'error', message: "Already registered"})
            }

            const salt = await bcryptjs.genSalt(10);

            const hashPassword = await bcryptjs.hash(password, salt);

            const payload = {name, email, password: hashPassword};

            const save = await userUseCase.create(payload);

            const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

            await sendEmail({
                sendTo: email,
                subject: "Verify email",
                html: verifyEmailTemplate({name, url: VerifyEmailUrl})
            })

            return res.status(201).json({
                status: "success",
                data: save,
                message: "Register successfully",
            })
        } catch (e) {
            return res.status(500).json({status: "error", message: e.message});
        }
    },
    verifyEmail: async (req, res) => {
        try {
            const {code} = req.body;

            const user = await userUseCase.getById(code);

            if (!user) {
                return res.status(400).json({status: 'error', message: "Invalid code"})
            }

            await userUseCase.update({_id: code}, {verify_email: true});

            return res.status(200).json({
                status: "success",
                message: "Verification successfully",
            })
        } catch (e) {
            return res.status(500).json({status: 'error', message: e.message});
        }
    },
    logout: async (req, res) => {
        try {
            const userId = req.userId;

            const cookiesOption = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
            }

            res.clearCookie("accessToken", cookiesOption)
            res.clearCookie("refreshToken", cookiesOption)

            await userUseCase.findIdAndUpdate(userId, {refresh_token: ""})

            return res.status(200).json({
                status: "success",
                message: "Logout successfully",
            })
        } catch (e) {
            return res.status(500).json({status: 'error', message: e.message});
        }
    },
    update: async (req, res) => {
        try {
            const userId = req.userId;
            const {name, email, mobile, password} = req.body;

            let hashPassword = "";

            if (password) {
                const salt = await bcryptjs.genSalt(10);
                hashPassword = await bcryptjs.hash(password, salt);
            }

            await userUseCase.update({_id: userId}, {
                ...(name && {name: name}),
                ...(email && {email: email}),
                ...(mobile && {mobile: mobile}),
                ...(password && {password: hashPassword}),
            });

            return res.status(200).json({
                status: "success",
                message: "Update successfully",
            })
        } catch (e) {
            return res.status(500).json({status: 'error', message: e.message});
        }
    },
    details: async (req, res) => {
        try {
            const userId = req.userId;
            const user = await userUseCase.getById(userId, '-password -refresh_token');

            return res.status(200).json({
                status: "success",
                data: user,
                message: "User details",
            })
        } catch (e) {
            return res.status(400).json({status: 'error', message: e.message});
        }
    },
    uploadAvatar: async (req, res) => {
        try {
            const userId = req.userId;
            const file = req.file

            if (!file) {
                return res.status(400).json({status: 'error', message: "No file uploaded"});
            }

            const imagePath = saveImage(file);

            await userUseCase.findIdAndUpdate(userId, {avatar: imagePath});

            return res.status(200).json({
                status: "success",
                message: "Upload successfully",
            })
        } catch (e) {
            return res.status(500).json({status: 'error', message: e.message});
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body;

            const user = await userUseCase.getByEmail(email);

            if (!user) {
                return res.status(400).json({status: 'error', message: "Email not available"});
            }

            const otp = (Math.floor(Math.random() * 900000) + 100000); //100000 -> 999999

            const expireTime = new Date() + 60 * 60 * 1000; //1hr

            await userUseCase.findIdAndUpdate(user._id, {
                forgot_password_otp: otp,
                forgot_password_expiry: new Date(expireTime).toISOString()
            });

            await sendEmail({
                sendTo: email,
                subject: "Forgot Password",
                html: forgotPasswordTemplate({name: user.name, otp: otp})
            })

            return res.status(200).json({
                status: "success",
                message: "Email sent successfully. Check your email",
            })
        } catch (e) {
            return res.status(500).json({status: 'error', message: e.message});
        }
    },
    verifyForgotPasswordOtp: async (req, res) => {
        try {
            const {email, otp} = req.body;

            if (!email || !otp) {
                return res.status(400).json({status: 'error', message: "Provide required field email, otp."})
            }

            const user = await userUseCase.getByEmail(email);

            if (!user) {
                return res.status(400).json({status: 'error', message: "Email not available"});
            }

            const currentTime = new Date().toISOString();

            if (user.forgot_password_expiry < currentTime) {
                return res.status(400).json({status: 'error', message: "Otp is expired"});
            }

            if (otp !== user.forgot_password_otp) {
                return res.status(400).json({status: 'error', message: "Invalid Otp"});
            }

            await userUseCase.findIdAndUpdate(user?._id, {
                forgot_password_otp: "",
                forgot_password_expiry: ""
            })

            return res.status(200).json({
                status: "success",
                message: "Verify otp successfully",
            })
        } catch (e) {
            return res.status(500).json({status: 'error', message: e.message});
        }
    },
    resetPassword: async (req, res) => {
        try {
            const {email, newPassword, confirmPassword} = req.body;

            if (!email || !newPassword || !confirmPassword) {
                return res.status(400).json({status: 'error', message: "Provide required"})
            }

            const user = await userUseCase.getByEmail(email);

            if (!user) {
                return res.status(400).json({status: 'error', message: "Email not available"});
            }

            if (newPassword !== confirmPassword) {
                return res.status(400).json({status: 'error', message: "Passwords do not match"});
            }

            const salt = await bcryptjs.genSalt(10);

            const hashPassword = await bcryptjs.hash(newPassword, salt);

            await userUseCase.findOneAndUpdate(user._id, {password: hashPassword});

            return res.status(200).json({
                status: "success",
                message: "Password updated successfully",
            })
        } catch (e) {
            return res.status(400).json({status: 'error', message: e.message});
        }
    },
    refreshToken: async (req, res) => {
        try {
            const userId = req.userId;

            const newAccessToken = await jwt.sign(
                {id: userId},
                process.env.SECRET_KEY_ACCESS_TOKEN,
                {expiresIn: '5h'}
            );

            const cookiesOption = {
                httpOnly: true,
                secure: true,
                sameSite: "None"
            }

            res.cookie('accessToken', newAccessToken, cookiesOption)

            return res.status(200).json({
                status: "success",
                data: {accessToken: newAccessToken},
                message: "New access token generated successfully",
            })
        } catch (e) {
            return res.status(400).json({status: 'error', message: e.message});
        }
    }
})

export default userController;
