import express from "express";
import { connectDB } from "./db/db.js";
import cors from "cors";

// imports routes
import testRouter from "./router/testRouter.js";
import blogRouter from "./router/blogRouter.js";

const app = express();
app.use(cors());
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use routes
app.use("/api", testRouter);
app.use("/api", blogRouter);

// start server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
