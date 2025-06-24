import {config} from "dotenv";
import express from "express";
import {fileURLToPath} from "url"
import path from "path"
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

import connectDB from "./config/db.js";

import ProductRepositoryMongo from "./infrastructure/repositories/ProductRepositoryMongo.js";
import UserRepositoryMongo from "./infrastructure/repositories/UserRepositoryMongo.js";
import AddressRepositoryMongo from "./infrastructure/repositories/AddressRepositoryMongo.js";
import CategoryRepositoryMongo from "./infrastructure/repositories/CategoryRepositoryMongo.js";

import UserUseCase from "./usecases/userUseCase.js";
import ProductUseCase from "./usecases/productUseCase.js";
import AddressUseCase from "./usecases/addressUseCase.js";
import CategoryUseCase from "./usecases/categoryUseCase.js";

import productRouter from "./interfaces/routes/product.route.js";
import userRouter from "./interfaces/routes/user.route.js";
import addressRouter from "./interfaces/routes/address.route.js";
import uploadRouter from "./interfaces/routes/upload.route.js";
import categoryRoute from "./interfaces/routes/category.route.js";

config();

const Port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// app.use(cors({
//     credentials: true,
//     origin: process.env.FRONTEND_URL
// }))
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
const productRepository = new ProductRepositoryMongo();
const userRepository = new UserRepositoryMongo();
const addressRepository = new AddressRepositoryMongo();
const categoryRepository = new CategoryRepositoryMongo();

const productUseCase = new ProductUseCase(productRepository);
const userUseCase = new UserUseCase(userRepository);
const addressUseCase = new AddressUseCase(addressRepository);
const categoryUseCase = new CategoryUseCase(categoryRepository);

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1/file", uploadRouter())
app.use("/api/v1/products", productRouter(productUseCase));
app.use("/api/v1/user", userRouter(userUseCase));
app.use("/api/v1/address", addressRouter(addressUseCase, userUseCase));
app.use("/api/v1/category", categoryRoute(categoryUseCase));

connectDB().then(() => {
    app.listen(Port, () => {
        console.log(`Server running on http://localhost:${Port}`);
    })
});
