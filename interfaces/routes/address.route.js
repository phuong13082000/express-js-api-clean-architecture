import express from "express";
import auth from "../../middleware/auth.js";
import addressController from "../controllers/address.controller.js";

const addressRouter = (addressUseCase, userUseCase) => {
    const router = express.Router();
    const controller = addressController(addressUseCase, userUseCase);

    router.get("/get", auth, controller.get);
    router.post('/create', auth, controller.create);
    router.put('/update', auth, controller.update);
    router.delete("/disable", auth, controller.delete)

    return router;
};

export default addressRouter;
