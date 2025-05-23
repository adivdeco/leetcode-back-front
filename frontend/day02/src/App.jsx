import { Routes, Route } from "react-router";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App(){
  return(
    <>

    <Routes>

      <Route path="/" element={<Homepage></Homepage>} />
      <Route path="/login" element={<Login></Login>} />
      <Route path="/signup" element={<Signup></Signup>} />

    </Routes>

    </>
  )
}
export default App