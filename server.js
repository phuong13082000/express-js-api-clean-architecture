import {config} from "dotenv";
import express from "express";
import {fileURLToPath} from "url"
import path from "path"
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

import connectDB from "./config/db.js";

import ProductRepoMongo from "./infrastructure/repositories/ProductRepoMongo.js";
import UserRepoMongo from "./infrastructure/repositories/UserRepoMongo.js";
import AddressRepoMongo from "./infrastructure/repositories/AddressRepoMongo.js";
import CategoryRepoMongo from "./infrastructure/repositories/CategoryRepoMongo.js";
import SubCategoryRepoMongo from "./infrastructure/repositories/SubCategoryRepoMongo.js";

import UserUseCase from "./usecases/userUseCase.js";
import ProductUseCase from "./usecases/productUseCase.js";
import AddressUseCase from "./usecases/addressUseCase.js";
import CategoryUseCase from "./usecases/categoryUseCase.js";
import SubCategoryUseCase from "./usecases/subCategoryUseCase.js";

import productRouter from "./interfaces/routes/product.route.js";
import userRouter from "./interfaces/routes/user.route.js";
import addressRouter from "./interfaces/routes/address.route.js";
import uploadRouter from "./interfaces/routes/upload.route.js";
import categoryRouter from "./interfaces/routes/category.route.js";
import subCategoryRouter from "./interfaces/routes/subCategory.route.js";

config();

const Port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// app.use(cors({credentials: true, origin: process.env.FRONTEND_URL}))
app.use(express.json()) //limit: '10kb' (json)
app.use(express.urlencoded({extended: true})); //(form data)
app.use(cookieParser())
app.use(morgan('dev')) //combined > common > dev > short
app.use(helmet({
    crossOriginResourcePolicy: false,
    // hidePoweredBy: false,
    // xssFilter: false,
}))

// DI (Dependency Injection)
const productRepository = new ProductRepoMongo();
const userRepository = new UserRepoMongo();
const addressRepository = new AddressRepoMongo();
const categoryRepository = new CategoryRepoMongo();
const subCategoryRepository = new SubCategoryRepoMongo();

const productUseCase = new ProductUseCase(productRepository);
const userUseCase = new UserUseCase(userRepository);
const addressUseCase = new AddressUseCase(addressRepository);
const categoryUseCase = new CategoryUseCase(categoryRepository);
const subCategoryUseCase = new SubCategoryUseCase(subCategoryRepository);

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1/file", uploadRouter())
app.use("/api/v1/products", productRouter(productUseCase));
app.use("/api/v1/user", userRouter(userUseCase));
app.use("/api/v1/address", addressRouter(addressUseCase, userUseCase));
app.use("/api/v1/category", categoryRouter(categoryUseCase, subCategoryUseCase));
app.use("/api/v1/sub-category", subCategoryRouter(subCategoryUseCase));

connectDB().then(() => {
    app.listen(Port, () => {
        console.log(`Server running on http://localhost:${Port}`);
    })
});
