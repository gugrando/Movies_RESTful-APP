import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../views/pages/Home";
import MoviePage from "../views/pages/MoviePage";
import MainLayout from "../views/layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/movie/:id", element: <MoviePage /> },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}