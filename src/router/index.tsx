import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Edit from "../pages/Edit";
import Error from "../pages/Error";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },
]);

export const UseRouter = () => {
  return <RouterProvider router={router} />;
};
