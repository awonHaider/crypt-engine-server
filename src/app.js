import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "100000kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from "./routes/user.routes.js";
import encryptionRouter from "./routes/encryption.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/encrypt", encryptionRouter)

export { app }