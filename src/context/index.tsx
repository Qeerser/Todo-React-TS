import { createContext, useContext, useReducer } from "react";
import { todoReducer } from "./todoReducer";
import { addTodo, deleteTodo, fetchTodoId, fetchTodos, updateTodo } from "../services";

const TodoContext = createContext<{
  Todo: Todo[],
  loading: boolean,
  current:Todo,
  dispatch: React.Dispatch<ToDoAction>,
  actions: {
    get: () => void,
    getId: (id:number) => void,
    add: (name: string) => void,
    update: (todo: Todo) => void,
    remove: (id: number) => void
  };
}>({
  Todo: [],
  loading: false,
  current: {} as Todo,
  dispatch: () => {},
  actions: {
    get: () => {},
    getId: () => {},
    add: () => {},
    update: () => {},
    remove: () => {},
  },
});

const initialState: ToDoState = { Todo: [],current: {} as Todo, loading: true };

export const TodoProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [todo, dispatch] = useReducer(todoReducer, initialState);
  const get = async () => {
    try {
      const todos = await fetchTodos();
      dispatch({ action: "get", payload: todos });
    } catch (error) {
      console.log(error);
    }
    dispatch({ action: "setLoading", loading: false });
  };
  const getId = async (id:number) => {
    dispatch({ action: "setLoading", loading: true })
    try {
      const todo = await fetchTodoId(id);
      dispatch({ action: "getid", payload: todo });
    } catch (error) {
      console.log(error);
    }
    dispatch({ action: "setLoading", loading: false });
  };

  const add = async (name: string) => {
    dispatch({ action: "setLoading", loading: true });
    try {
      const newTodo = await addTodo(name);
      dispatch({ action: "add", payload: newTodo });
    } catch (error) {
      console.log(error);
    }
    dispatch({ action: "setLoading", loading: false });
  };

  const update = async (todo: Todo) => {
    try {
      const updatedTodo = await updateTodo(todo);
      dispatch({ action: "update", payload: updatedTodo });
    } catch (error) {
      console.log(error);
    }
  };

  const remove = async (id: number) => {
    try {
      dispatch({ action: "delete", id:id });
      await deleteTodo(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        Todo: todo.Todo,
        current: todo.current,
        loading: todo.loading,
        dispatch,
        actions: {
          get,
          getId,
          add,
          update,
          remove,
        },
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
export const UseTodo = () => {
  return useContext(TodoContext);
};
