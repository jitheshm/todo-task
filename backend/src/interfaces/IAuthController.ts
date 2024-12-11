import { Request, Response } from "express";

interface IAuthController {
  signup: (req: Request, res: Response) => void;
  login:(req:Request,res:Response)=>void
}

export default IAuthController;
