import { createSlice, PayloadAction ,createAsyncThunk  } from "@reduxjs/toolkit"
import { addTodo, deleteTodo, fetchTodoId, fetchTodos, updateTodo } from '../services'

export const fetchTodoLists = createAsyncThunk<Todo[]>(
  'todo/fetchTodoLists',
  async () => {
    return await fetchTodos(); // This runs when the action is dispatched
  }
);

export const fetchTodoList = createAsyncThunk<Todo, number>(
  'todo/fetchTodoList', // Corrected action name
  async (id) => await fetchTodoId(id)
);

export const addTodoList = createAsyncThunk<Todo, string>(
  'todo/addTodoList',
  async (newTodo) => await addTodo(newTodo)
);

export const updateTodoList = createAsyncThunk<Todo, Todo>(
  'todo/updateTodoList',
  async (updatedTodo) => await updateTodo(updatedTodo)
);

export const deleteTodoList = createAsyncThunk<number, number>(
  'todo/deleteTodoList',
  async (todoId) => await deleteTodo(todoId)
);

const initialState: ToDoState = {
  Todo: [],
  current: {} as Todo,
  loading: false,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
  },
  extraReducers:(builder) =>{
    builder
    .addCase(fetchTodoLists.fulfilled ,(state:ToDoState, action: PayloadAction<Todo[]>) => {
      state.Todo = action.payload;
    })
    .addCase(fetchTodoList.fulfilled ,(state:ToDoState, action: PayloadAction<Todo>) => {
      state.current = action.payload;
    })
    .addCase(addTodoList.fulfilled ,(state:ToDoState, action: PayloadAction<Todo>) => {
      state.Todo.push(action.payload); 
    })
    .addCase(updateTodoList.fulfilled ,(state:ToDoState, action: PayloadAction<Todo>) => {
      state.Todo = state.Todo.map(todo =>
        todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
      ) 
    })
    .addCase(deleteTodoList.fulfilled ,(state:ToDoState, action: PayloadAction<number>) => {
      state.Todo = state.Todo.filter(todo => todo.id !== action.payload);
    })
    .addMatcher(
      (action) => action.type.endsWith("/fulfilled"),
      (state) => {
        state.loading = false;
      },
    )
    .addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.loading = true;
      },
    )
    .addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state) =>{
          state.loading = false
      }
    )
  },
});

export default todoSlice.reducer;
