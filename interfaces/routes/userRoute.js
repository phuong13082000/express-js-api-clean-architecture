import express from "express";
import validateRequest from "../../middleware/validateRequest.js";
import userController from "../controllers/userController.js";
import {createUserDTO} from "../../dto/createUserDTO.js";
import {loginUserDTO} from "../../dto/loginUserDTO.js";
import auth from "../../middleware/auth.js";
import {uploadMiddlewareImage} from "../../utils/uploadImageLocal.js";

const userRoute = (userUseCase) => {
    const router = express.Router();
    const controller = userController(userUseCase);

    router.post("/register", validateRequest(createUserDTO), controller.register);
    router.post("/login", validateRequest(loginUserDTO), controller.login);
    router.get("/details", auth, controller.details);
    router.get("/logout", auth, controller.logout);
    router.post('/verify-email', controller.verifyEmail)
    router.put('/upload-avatar', auth, uploadMiddlewareImage, controller.uploadAvatar)
    router.put('/update-user', auth, controller.update)
    router.put('/forgot-password', controller.forgotPassword)
    router.put('/verify-forgot-password-otp', controller.verifyForgotPasswordOtp)
    router.put('/reset-password', controller.resetPassword)
    router.post('/refresh-token', auth, controller.refreshToken)

    return router;
};

export default userRoute;
