import { Request, Response } from "express";
import TodoModel from "../models/TodoModel";
import { verifyToken } from "../utils/token";
import ITodoController from "../interfaces/ITodoController";
import mongoose from "mongoose";
class TodoController implements ITodoController {
  addTodo(req: Request, res: Response) {
    try {
      let { task } = req.body;
      const decode = verifyToken(req.headers.authorization as string);
      if (!decode) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const todo = new TodoModel({ task, userId: decode.id });
      todo.save();
      res
        .status(200)
        .json({ success: true, message: "todo added successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "todo add failed" });
    }
  }

  updateTodoStatus(req: Request, res: Response) {
    try {
      let { id } = req.params;
      let { status } = req.body;
      const decode = verifyToken(req.headers.authorization as string);
      if (!decode) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const todo = TodoModel.findOneAndUpdate(
        { userId: decode.id, taskId: new mongoose.Schema.Types.ObjectId(id) },
        { status },
        { new: true }
      );
      res
        .status(200)
        .json({ success: true, message: "todo updated successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "todo update failed" });
    }
  }

  updateTodo(req: Request, res: Response) {
    try {
      let { id } = req.params;
      let { task } = req.body;
      const decode = verifyToken(req.headers.authorization as string);
      if (!decode) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const todo = TodoModel.findOneAndUpdate(
        { userId: decode.id, taskId: new mongoose.Schema.Types.ObjectId(id) },
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

  deleteTodo(req: Request, res: Response) {
    try {
      let { id } = req.params;
      const decode = verifyToken(req.headers.authorization as string);
      if (!decode) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const todo = TodoModel.findOneAndDelete({
        userId: decode.id,
        taskId: new mongoose.Schema.Types.ObjectId(id),
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
