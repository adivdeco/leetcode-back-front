import { Routes, Route,Navigate } from "react-router";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {checkAuth} from "./authSlice"
import { useDispatch,useSelector} from "react-redux";
import { useEffect } from "react";
import AdminPanel from "./pages/AdminPanel";
import ProblemPage from "./pages/ProblemPage"



function App(){

// code likhna isAuthentciated
  const dispatch = useDispatch();   // hear dispatch Hook , send actions to Redux store
  const {isAuthenticated,user,loading} =  useSelector((state)=>state.auth);  //it allows you to read values from the Redux state 

  useEffect(()=>{
   dispatch(checkAuth());
  },[dispatch]);

 
 if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }
  
  // console.log(isAuthenticated);
  
  
  

  return(
    <>
    <Routes>

      <Route path="/" element={isAuthenticated ? <Homepage></Homepage>:<Navigate to="/signup"/>}></Route>
      <Route path="/login" element={isAuthenticated ?<Navigate to="/" />:<Login></Login>}></Route>
      <Route path="/signup" element={isAuthenticated?<Navigate to="/"/>:<Signup></Signup>}></Route>
      <Route path="/admin" element={<AdminPanel/>}></Route>
      <Route path="/problem/:problemId" element={<ProblemPage/>}></Route>

    </Routes> 
    </>
  )
}
export default App