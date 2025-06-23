import express from "express";
import imageController from "../controllers/imageController.js";
import {uploadMiddlewareImage} from "../../utils/uploadImageLocal.js";
import auth from "../../middleware/auth.js";

const imageRouter = () => {
    const router = express.Router();
    const controller = imageController();

    router.post("/", auth, uploadMiddlewareImage, controller.upload);

    return router;
};

export default imageRouter;
