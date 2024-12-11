import { Request, Response } from "express";
import TodoModel from "../models/TodoModel";
import { verifyToken } from "../utils/token";
import ITodoController from "../interfaces/ITodoController";
import mongoose from "mongoose";
class TodoController implements ITodoController {
  async addTodo(req: Request, res: Response) {
    try {
      let { task } = req.body;
      console.log(req.cookies.token)
      const decode = verifyToken(req.cookies.token as string);
      if (!decode) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const todo = new TodoModel({ task, userId: decode.id });
      await todo.save();
      res
        .status(200)
        .json({ success: true, message: "todo added successfully",data:todo });
    } catch (error) {
      res.status(500).json({ success: false, message: "todo add failed" });
    }
  }

  async updateTodoStatus(req: Request, res: Response) {
    try {
      let { id } = req.params;
      let { completed } = req.body;
      console.log(completed)
      const decode = verifyToken(req.cookies.token as string);
      if (!decode) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      console.log(decode.id)
      const todo =await TodoModel.findOneAndUpdate(
        { userId: decode.id, _id: new mongoose.Types.ObjectId(id) },
        { completed:completed },
        { new: true }
      );
      console.log(todo)
      res
        .status(200)
        .json({ success: true, message: "todo updated successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "todo update failed" });
    }
  }

  async updateTodo(req: Request, res: Response) {
    try {
      let { id } = req.params;
      let { task } = req.body;
      const decode = verifyToken(req.cookies.token as string);
      if (!decode) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const todo = await TodoModel.findOneAndUpdate(
        { userId: decode.id, _id: new mongoose.Types.ObjectId(id) },
        { task },
        { new: true }
      );
      res
        .status(200)
        .json({ success: true, message: "todo updated successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "todo update failed" });
    }
  }

  async deleteTodo(req: Request, res: Response) {
    try {
      let { id } = req.params;
      const decode = verifyToken(req.cookies.token as string);
      if (!decode) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const todo = await TodoModel.findOneAndDelete({
        userId: decode.id,
        _id: new mongoose.Types.ObjectId(id),
      });
      res
        .status(200)
        .json({ success: true, message: "todo deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "todo deletion failed" });
    }
  }
}

export default TodoController;
