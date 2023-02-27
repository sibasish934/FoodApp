import express, { urlencoded } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/User.js";
import orderRoutes from "./routes/order.js";
import cookieParser from "cookie-parser";
// import passport from "passport";
import { connectPassport } from "./utils/provider.js";
import session from "express-session";
import passport from "passport";
import { errorMiddleWare } from "./middleware/errorMiddleware.js";
import cors from "cors";

const app = express();
export default app;

dotenv.config({
    path:"./config/config.env"
})
app.use(cookieParser());

app.use(express.json());

app.use(urlencoded({
    extended:true,
}))

app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL,
    methods:["GET", "POST", "PUT","DELETE"],
}))

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,

    cookie:{
        secure:process.env.NODE_ENV === "development" ? false:true,
        httpOnly:process.env.NODE_ENV === "development" ? false:true,
        sameSite:process.env.NODE_ENV === "development" ? false : "none",
    }
}));

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

app.enable("trust proxy");
connectPassport();

app.use('/api/v1', userRoutes);
app.use('/api/v1', orderRoutes);

app.use(errorMiddleWare);