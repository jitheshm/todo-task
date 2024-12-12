
import mongoose, { Schema } from "mongoose";
import ITodo from "../interfaces/ITodo";

const todoSchema: Schema<ITodo> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  task: { type: String, required: true },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, required: true, default: false },
});

const TodoModel = mongoose.model<ITodo>("Todo", todoSchema);

export default TodoModel;


