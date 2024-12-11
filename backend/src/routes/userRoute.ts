import { Router } from "express";
import IUserController from "../interfaces/IUserController";
import UserController from "../controller/UserController";

const router = Router();
const userController: IUserController = new UserController();

router.get("/signup", userController.signup);

export default router;
