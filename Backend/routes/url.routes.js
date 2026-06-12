import express from "express";
import { createShortenUrl, getoriginalUrl } from "../controllers/url.controllers.js";

const urlRouter = express.Router();

urlRouter.post("/shorten",createShortenUrl );
urlRouter.get("/:shortCode", getoriginalUrl);

export default urlRouter;

