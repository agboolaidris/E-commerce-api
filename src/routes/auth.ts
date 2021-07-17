import { Router } from "express";

import trim from "../helpers/trim";

import {
  AdminRegister,
  AdminLogin,
  AdminIsMe,
  AdminLogout,
} from "../controllers/auth/adminAuth";

import {
  UserRegister,
  UserLogin,
  UserIsMe,
  UserLogout,
} from "../controllers/auth/userAuth";

import { registerValid, loginValid } from "../validations/authValid";

import { userMiddleware, adminMiddleware } from "../middleware/auth";

const router = Router();

//@desc register
router.post("/admin/register", [trim, registerValid], AdminRegister);
router.post("/user/register", [trim, registerValid], UserRegister);

//@desc login
router.post("/admin/login", [trim, loginValid], AdminLogin);
router.post("/user/login", [trim, loginValid], UserLogin);

//@desc isme
router.get("/admin/isme", [adminMiddleware], AdminIsMe);
router.get("/user/isme", [userMiddleware], UserIsMe);

//@desc logout
router.get("/admin/logout", [adminMiddleware], AdminLogout);
router.get("/user/logout", [userMiddleware], UserLogout);

export default router;
