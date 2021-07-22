import { Router } from "express";

import trim from "../helpers/trim"; // trim middleware for input data

import {
  AdminRegister,
  AdminLogin,
  AdminIsMe,
  AdminLogout,
} from "../controllers/auth/adminAuth"; //admin controller

import {
  UserRegister,
  UserLogin,
  UserIsMe,
  UserLogout,
} from "../controllers/auth/userAuth"; //user controller

import { registerValid, loginValid } from "../validations/authValid"; // validation middleware

import { userMiddleware, adminMiddleware } from "../middleware/auth"; // authentication middleware for both admin & user

const router = Router();

//@desc admin register route
router.post("/admin/register", [trim, registerValid], AdminRegister);

//desc user register route
router.post("/user/register", [trim, registerValid], UserRegister);

//@desc admin login route
router.post("/admin/login", [trim, loginValid], AdminLogin);

//desc user login route
router.post("/user/login", [trim, loginValid], UserLogin);

//@desc admin get profile
//private route
router.get("/admin/isme", [adminMiddleware], AdminIsMe);

//desc user get profile
//private route
router.get("/user/isme", [userMiddleware], UserIsMe);

//@desc admin logout route
//private route
router.get("/admin/logout", [adminMiddleware], AdminLogout);

//@desc user logout route
//private route
router.get("/user/logout", [userMiddleware], UserLogout);

export default router;
