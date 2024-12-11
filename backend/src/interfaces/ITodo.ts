import mongoose from "mongoose";

interface ITodo {
    userId: mongoose.Schema.Types.ObjectId;
    task: string;
    status: string;
}

export default ITodo