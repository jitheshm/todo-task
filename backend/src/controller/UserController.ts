import IUserController from "../interfaces/IUserController";
import { Request, Response } from "express";

class UserController implements IUserController {
  signup = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
    } catch (error) {
      res.status(500).json({ success: false, message: "user signup failed" });
    }
  };
}

export default UserController;
