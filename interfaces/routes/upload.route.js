import express from "express";
import uploadController from "../controllers/upload.controller.js";
import {uploadMiddlewareImage} from "../../utils/uploadImageLocal.js";
import auth from "../../middleware/auth.js";

const uploadRouter = () => {
    const router = express.Router();
    const controller = uploadController();

    router.post("/", auth, uploadMiddlewareImage, controller.upload);

    return router;
};

export default uploadRouter;
