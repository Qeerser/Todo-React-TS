import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchTodoList, updateTodoList } from "../store/todoSlice";

export default function Edit() {
  const id = parseInt(useParams().id || "0");
  const [todo, setTodo] = useState({} as Todo);
  const current = useAppSelector((state)=> state.todo.current)
  const loading = useAppSelector((state)=> state.todo.loading)

  const dispatch = useAppDispatch()


  const [isUpdate , setIsUpdate] = useState(false)
  useEffect(() => {
    dispatch(fetchTodoList(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTodo(current);
  }, [current]);

  const editTodo = async () => {
    dispatch(updateTodoList(todo))
    setIsUpdate(true)
    setTimeout(() => {
        setIsUpdate(false)
      }, 2000)
  };

  return (
    <div className="w-1/2 mx-auto">
      <div className="flex items-center my-2">
        <Link to="/">
          <button className="btn btn-square btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </button>
        </Link>
        <div className="ml-2 mb-2 font-bold text-2xl">Edit</div>
      </div>

      {loading ? (
        <span className="loading loading-spinner loading-lg text-error"></span>
      ) : Object.keys(current).length != 0 ? (
        <div className="flex flex-col">
          <div className="flex gap-4 badge badge-secondary text-lg font-bold m-auto badge-outline">
            <div className="text-m ml-1  gap-1 ">Item id :</div>
            <span className="">{id}</span>
          </div>
          <div className="form-control">
        <label className="label badge badge-accent gap-4 my-3 text-base font-semibold" >
          <span className="">Item name</span>
        </label>
          <input className="bg-base-300 input input-bordered w-full text-lg"
            type="text"
            value={todo.name}
            onChange={(e) => {
              setTodo((p) => ({
                ...p,
                name: e.target.value,
              }));
            }}
          />
          </div>
          <div className="form-control ">
            <label className=" label badge badge-accent gap-4 my-3 text-base font-semibold">
              <span className="">Status</span>
            </label>
            <select
              className="bg-base-300 select select-bordered text-lg"
              value={todo.status}
              onChange={(e) => {
                setTodo((prevTodo) => ({
                  ...prevTodo,
                  status: e.target.value as Todo["status"],
                }));
              }}
            >
              <option value="Pending">Pending</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="mt-4">
          <button  className="btn btn-primary w-full" onClick={editTodo}>update</button>
          </div>
        </div>
      ) : (
        <p>No todo found with that id.</p>
      )}
      <div className="toast toast-top toast-start">
      {isUpdate && <div className="alert alert-success">
        <span>Update successful.</span>
      </div>}
    </div>
    </div>
  );
}
