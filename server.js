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

import UserUseCase from "./usecases/userUseCase.js";
import ProductUseCase from "./usecases/productUseCase.js";
import AddressUseCase from "./usecases/addressUseCase.js";

import productRouter from "./interfaces/routes/productRoute.js";
import imageRouter from "./interfaces/routes/imageRoute.js";
import userRoute from "./interfaces/routes/userRoute.js";
import addressRoute from "./interfaces/routes/addressRoute.js";

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
app.use(express.urlencoded({ extended: true })); //(form data)
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

const productUseCase = new ProductUseCase(productRepository);
const userUseCase = new UserUseCase(userRepository);
const addressUseCase = new AddressUseCase(addressRepository);

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1/file", imageRouter())
app.use("/api/v1/products", productRouter(productUseCase));
app.use("/api/v1/user", userRoute(userUseCase));
app.use("/api/v1/address", addressRoute(addressUseCase, userUseCase));

connectDB().then(() => {
    app.listen(Port, () => {
        console.log(`Server running on http://localhost:${Port}`);
    })
});
