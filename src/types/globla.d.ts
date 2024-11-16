declare global {
  interface Todo {
    id: number;
    name: string;
    status: "Pending" | "Doing" | "Done";
  }

  interface ToDoState {
    Todo: Todo[],
    current :Todo,
    loading: boolean
  }

  type ToDoAction =
    | { action: "get"; payload: Todo[] }
    | { action: "getid"; payload: Todo }
    | { action: "add"; payload: Todo }
    | { action: "update"; payload: Todo }
    | { action: "delete"; id: number }
    | { action: "setLoading"; loading: boolean };
}

export {};
