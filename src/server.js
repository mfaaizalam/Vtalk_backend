// import express from "express";
// import dotenv  from "dotenv";
// import authRoutes from "./routes/auth.route.js";
// import { connectDB } from "./lib/db.js";
// import cookieParser from "cookie-parser";
// import userRoutes from "./routes/user.routes.js";
// import chatRoutes from "./routes/chat.routes.js"
// import aichat from "./routes/ai.routes.js"
// import cors from "cors";
// dotenv.config();
// const app = express();

// app.use(cors({
//     origin:["http://localhost:5173", 
//     "http://localhost:5174","http://localhost:5175"],//allow frontend to send cookies
//     credentials:true,
// }))


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));``
// app.use(cookieParser());
// app.use("/api/auth",authRoutes)
// app.use("/api/user",userRoutes)
// app.use("/api/chat",chatRoutes)
// app.use("/chat", chatRoutes);
// app.use("/chat",aichat );

// const PORT = process.env.PORT || 3000;

// // app.listen(PORT,()=>{
// //     console.log(`Server is running on PORT ${PORT}`);
// //     connectDB();
// // })
// let isconnected = false;

// async function connecttomogodb(){
//     connectDB()
//     isconnected = true;
// }

// app.use(async (req,res,next)=>{
//     if(!isconnected){
//         await connecttomogodb();
//     }
//     next();
// })
// export default app;

import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import aichat from "./routes/ai.routes.js";
import cors from "cors";

dotenv.config();
const app = express();

// CORS settings
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/chat", chatRoutes);
app.use("/chat", aichat);



if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

let isConnected = false;

async function connectToMongoDB() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}

// Middleware to connect DB before any request
app.use(async (req, res, next) => {
  await connectToMongoDB();
  next();
});

// **Export app for Vercel**
export default app;
