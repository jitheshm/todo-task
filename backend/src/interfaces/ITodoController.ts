import { Request, Response } from "express";
interface ITodoController{
    addTodo(req: Request, res: Response): void
    updateTodoStatus(req: Request, res: Response): void
    updateTodo(req: Request, res: Response): void
    deleteTodo(req: Request, res: Response): void
}
export default ITodoController