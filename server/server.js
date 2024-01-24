import express from "express";

// imports routes
import testRouter from "./router/testRouter.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use routes
app.use("/api", testRouter);

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
