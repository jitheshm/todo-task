import IAuthController from "../interfaces/IAuthController";
import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { hashPassword } from "../utils/bycrypt";

class AuthController implements IAuthController {
  signup = async (req: Request, res: Response) => {
    try {
      let { email, password } = req.body;
      const userExist = await UserModel.findOne({ email: email });

      if (userExist)
        return res
          .status(400)
          .json({ success: false, message: "user already exist" });

      password = await hashPassword(password);
      const user = new UserModel({ email, password });
      await user.save();
      res
        .status(201)
        .json({ success: true, message: "user signup successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "user signup failed" });
    }
  };
}

export default AuthController;
