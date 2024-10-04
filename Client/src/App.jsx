import "./App.css";
import Navbar from "./Components/Navbar";
import AllRoutes from "./Routes/AllRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// https://personal-blog-app-ozhq.vercel.app/api/v1/

function App() {
  return (
    <>
      <Navbar />
      <AllRoutes />
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
