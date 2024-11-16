import { useEffect, useState } from "react";
import Todolist from "../components/todolist";
import { UseTodo } from "../context";


export default function Home() {
  const {loading, actions } = UseTodo();
  const [name, setName] = useState("");

  useEffect(() => {
    actions.get();
    
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
          setName("");
          if(name) actions.add(name);
        }}
      >
        Add
      </button>
      </div>
      {!loading ? <Todolist /> : <span className="loading loading-spinner loading-lg text-error"></span>}
    </>
  );
}
