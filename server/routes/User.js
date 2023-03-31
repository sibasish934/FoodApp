import express from "express";
import passport from "passport";
import {
  getAllUsers,
  getUserStats,
  logout,
  myprofile,
} from "../controllers/user.js";
import { isAdminAuthenicated, isAuthenicated } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/googleauth",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// router.get('/login', passport.authenticate("google", {
//     scope:["profile"],
//     successRedirect:process.env.FRONTEND_URL,
// }))

router.get(
  "/login",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
  })
  // (req, res, next)=>{
  //   res.send("logged in");
  // }
);

router.get("/me", isAuthenicated, myprofile);

router.get("/logout", logout);

router.get("/admin/user", isAuthenicated, isAdminAuthenicated, getAllUsers);

router.get("/admin/stats", isAuthenicated, isAdminAuthenicated, getUserStats);

export default router;
