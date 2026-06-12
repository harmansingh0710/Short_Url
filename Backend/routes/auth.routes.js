import express from "express";
import { getUserData, login, logout, signUp } from "../controllers/auth.controllers.js";
import { upload } from "../middlewares/multer.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/signup",upload.single("profileImage"),signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getUserData",checkAuth, getUserData);

export default router;







// import express from "express";
// import { login, logout, signUp } from "../controllers/auth.controllers.js";

// const authRouter = express.Router();

// authRouter.post("/signup", signUp);
// authRouter.post("/login", login);
// authRouter.post("/logout", logout);
// export default authRouter;
