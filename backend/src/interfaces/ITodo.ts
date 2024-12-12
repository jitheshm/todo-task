import mongoose from "mongoose";

interface ITodo {
  userId: mongoose.Schema.Types.ObjectId;
  task: string;
  dueDate: Date;
  completed: boolean;
}

export default ITodo;
