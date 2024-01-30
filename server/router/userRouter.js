import { Router } from "express";
import {
  auth,
  getUser,
  addPublication,
  appAPIKey,
  getRepo,
  getCommits,
} from "../controller/userController.js";

const router = Router();
router.post("/auth", auth);
router.get("/getuser/:userId", getUser);
router.patch("/addpub", addPublication);
router.patch("/addApiKey", appAPIKey);
router.get("/getrepo/:token", getRepo);
router.post("/getcommit", getCommits);

export default router;
