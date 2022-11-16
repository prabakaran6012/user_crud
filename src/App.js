import { useEffect } from "react"
import { Toaster } from "react-hot-toast"
import {Routes,Route} from "react-router-dom"
import Login from "./components/auth/Login"
import SignUp from "./components/auth/SignUp"
import Home from "./components/crud/Home"
const App=()=>{
  useEffect(()=>{
console.log("Hai from App component")
  },[])
  return(<>
   <div>{<Toaster/>}</div>
    <Routes>
      <Route path="/" element={<SignUp/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path='/Home' element={<Home/>}/>
    </Routes>
  </>)
}
export default App