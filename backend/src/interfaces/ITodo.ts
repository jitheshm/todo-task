import mongoose from "mongoose";

interface ITodo {
  userId: mongoose.Schema.Types.ObjectId;
  task: string;
  completed: boolean;
}

export default ITodo;
