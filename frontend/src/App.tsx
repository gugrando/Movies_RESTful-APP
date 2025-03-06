// import { RouterProvider } from "react-router-dom"; 
import AppRoutes from "./routes/index.tsx"; // Importando as rotas
import "./index.css"; // Tailwind CSS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <AppRoutes />
    </>
  )
}

export default App
