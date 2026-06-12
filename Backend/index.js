import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import urlRouter from "./routes/url.routes.js";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("SERVER OK");
});

app.use("/api", authRouter);
app.use("/api", urlRouter);

const PORT = process.env.PORT || 8000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});









// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import connectDB from "./config/db.js";
// import authRouter from "./routes/auth.routes.js";
// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(cookieParser());
// app.use("/api", authRouter);
// const PORT = process.env.PORT || 8000;

// app.get("/", (req, res) => {
//   res.send("SERVER OK");
// });


// connectDB();
// app.listen(PORT,()=>{
//       console.log(`Server is running on port ${PORT}`);
// })