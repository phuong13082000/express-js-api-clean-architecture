import express from "express";
import auth from "../../middleware/auth.js";
import subCategoryController from "../controllers/subCategory.controller.js";

const subCategoryRouter = (subCategoryUseCase) => {
    const router = express.Router();
    const controller = subCategoryController(subCategoryUseCase);

    router.get("/get", controller.get);
    router.post('/create', auth, controller.create);
    router.put('/update', auth, controller.update);
    router.delete("/delete", auth, controller.delete)

    return router;
};

export default subCategoryRouter;
