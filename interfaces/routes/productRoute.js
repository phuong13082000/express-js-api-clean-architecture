import express from "express";
import validateRequest from "../../middleware/validateRequest.js";
import {createProductDTO} from "../../dto/createProductDTO.js";
import productController from "../controllers/productController.js";

const productRouter = (productUseCase) => {
    const router = express.Router();
    const controller = productController(productUseCase);

    router.get("/", controller.list);
    router.post("/", validateRequest(createProductDTO), controller.create);
    router.get("/:id", controller.getById);

    return router;
};

export default productRouter;
