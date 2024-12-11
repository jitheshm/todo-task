import { Request, Response } from "express";

interface IUserController {
  signup: (req: Request, res: Response) => void;
}

export default IUserController;
