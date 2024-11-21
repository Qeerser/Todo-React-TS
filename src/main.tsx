import { createRoot } from "react-dom/client";
import { UseRouter } from "./router";
import "./index.css"
import { Provider } from "react-redux";
import store from "./store";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <div className="max-w-3xl	mx-auto	my-0 p-4">
        <UseRouter />
      </div>
    </Provider>
);
