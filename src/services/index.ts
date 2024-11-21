import axios from "axios";

const URL = "https://673323422a1b1a4ae1123281.mockapi.io";

export const fetchTodos = async () => {
  const response = await axios.get(`${URL}/todos`);
  return response.data;
};

export const fetchTodoId = async (id:number) => {
  const response = await axios.get(`${URL}/todos/${id}`);
  return response.data;
};

export const addTodo = async (name: string) => {
  const bodyData = { name: name, status: "Pending" };
  const response = await axios.post(`${URL}/todos`, bodyData);
  return response.data;
};

export const updateTodo = async (todo: Todo) => {
  const response = await axios.put(`${URL}/todos/${todo.id}`, todo);
  return response.data;
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`${URL}/todos/${id}`);
  return id
};
