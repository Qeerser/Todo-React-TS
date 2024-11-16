export function todoReducer(state: ToDoState, action: ToDoAction): ToDoState {
  switch (action.action) {
    case "get":
      return { ...state, Todo: action.payload };
    
    case "getid":
      return { ...state,current: action.payload };
    case "add":
      return {
        ...state,
        Todo: [...state.Todo, action.payload],
      };
    case "update":
      return {
        ...state,
        Todo: state.Todo.map((todo) =>
          todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
        ),
      };
    case "delete":
      return {
        ...state,
        Todo: state.Todo.filter((todo) => todo.id !== action.id),
      };
    case "setLoading":
      return { ...state, loading: action.loading };
    default:
      throw new Error("Unknown action");
  }
}
