import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./login/Login";
import Signup from "./signup/Signup";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <RouterProvider router={routes} />
  );
}

export default App;
