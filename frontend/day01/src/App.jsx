import { Routes, Route } from "react-router";
import Homepage from "./Homepage";
import Login from "./Login";
import Signup from "./Signup";

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