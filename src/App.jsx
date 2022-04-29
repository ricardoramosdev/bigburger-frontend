
import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home/Home"
import { Login } from "./pages/Login/Login"
import { User } from "./pages/Users/user"


export const App = () =>{
  // const user = JSON.parse(localStorage.getItem('user'))||[];
  return(
    <>
     <Routes>
        <Route path="" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/User" element={<User/>}/>
        

      </Routes>
    </>
  )
}
