import { Router } from "express";
import IAuthController from "../interfaces/IAuthController";
import AuthController from "../controller/AuthController";

const router = Router();
const authController: IAuthController = new AuthController();

router.post("/signup", authController.signup);

export default router;
