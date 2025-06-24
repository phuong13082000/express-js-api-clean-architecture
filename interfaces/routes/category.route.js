import express from "express";
import auth from "../../middleware/auth.js";
import categoryController from "../controllers/category.controller.js";

const categoryRouter = (categoryUseCase) => {
    const router = express.Router();
    const controller = categoryController(categoryUseCase);

    router.get("/get", controller.get);
    router.post('/create', auth, controller.create);
    router.put('/update', auth, controller.update);
    router.delete("/delete", auth, controller.delete)

    return router;
};

export default categoryRouter;
