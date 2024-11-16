import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UseRouter } from "./router";
import { TodoProvider } from "./context/index";
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TodoProvider>
      <div className="max-w-3xl	mx-auto	my-0 p-4">
        <UseRouter />
      </div>
    </TodoProvider>
  </StrictMode>
);
