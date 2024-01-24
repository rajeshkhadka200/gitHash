import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// imports routes
import testRouter from "./router/testRouter.js";

const app = express();
dotenv.config();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use routes
app.use("/api", testRouter);

// start server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
