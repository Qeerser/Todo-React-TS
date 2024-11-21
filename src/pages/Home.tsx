import { useEffect, useState } from "react";
import Todolist from "../components/todolist";
import { useAppDispatch, useAppSelector } from "../store";
import { addTodoList, fetchTodoLists } from "../store/todoSlice";


export default function Home() {
  const [name, setName] = useState("");

  const loading = useAppSelector((state) => state.todo.loading)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTodoLists())
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
        <div className="flex">
      <input className="input input-bordered input-info w-full"
        placeholder="Add your item"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button className="btn ml-4 btn-secondary"
        onClick={() => {
          if(name) {
          dispatch(addTodoList(name))
          setName("");}
        }}
      >
        Add
      </button>
      </div>
      {!loading ? <Todolist /> : <span className="loading loading-spinner loading-lg text-error"></span>}
    </>
  );
}
