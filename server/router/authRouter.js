import { Router } from "express";
import {
  auth,
  getUser,
  addPublication,
  appAPIKey,
} from "../controller/authController.js";

const router = Router();
router.post("/auth", auth);
router.get("/getuser/:userId", getUser);
router.patch("/addpub", addPublication);
router.patch("/addApiKey", appAPIKey);

export default router;
