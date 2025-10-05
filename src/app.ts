import dotenv from 'dotenv';
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { envVars } from "./app/config/env";
import { routes } from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import expressSession from "express-session";
import passport from 'passport';
import "./app/config/passport";
import cookieParser from "cookie-parser";

dotenv.config();
const app: Application = express();

// parsers
app.set("trust proxy", 1);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    origin: [envVars.FRONTEND_URL],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(expressSession({
  secret: envVars.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// All routes 
app.use("/api/v1", routes);

// Main route
app.get("/", (req: Request, res: Response) => {
  res.send(`MongoServe Server Running on Port ${envVars.PORT}`);
});

// global error handler middleware
app.use(globalErrorHandler);

// route not found middleware
app.use(notFound);

export default app;