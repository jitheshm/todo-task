import { Router } from "express";
import ITodoController from "../interfaces/ITodoController";
import TodoController from "../controller/TodoController";


const router = Router();
const todoController: ITodoController = new TodoController();

router.post("/todos", todoController.addTodo);
router.put("/todos/:id", todoController.updateTodo);
router.put("/todos/:id/status", todoController.updateTodoStatus);
router.delete("/todos/:id", todoController.deleteTodo);

export default router;
