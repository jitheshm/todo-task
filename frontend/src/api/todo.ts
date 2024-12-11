import { AxiosResponse } from "axios";
import { axiosInstance } from "../axios";
import ITodo from "../interfaces/ITodo";

export const addTodoAPI = async (todoData: ITodo): Promise<AxiosResponse> => {
  return await axiosInstance.post("task/todos", todoData);
};

export const deleteTodoAPI = async (id: string): Promise<AxiosResponse> => {
  return await axiosInstance.delete(`/task/todos/${id}`);
};

export const updateTodoAPI = async (
  id: string,
  todoData: {task:string}
): Promise<AxiosResponse> => {
  return await axiosInstance.put(`/task/todos/${id}`, todoData);
};

export const updateTodoStatusAPI = async (
  id: string,
  todoData: {completed:boolean}
): Promise<AxiosResponse> => {
  return await axiosInstance.put(`/task/todos/${id}/status`, todoData);
}


export const fetchTodoAPI = async (): Promise<AxiosResponse> => {
  return await axiosInstance.get("/task/todos");
};