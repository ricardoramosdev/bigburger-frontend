
import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home/Home"
import { Login } from "./pages/Login/Login"


export const App = () =>{
  const user = JSON.parse(localStorage.getItem('user'))||{
    name:'Juan Perez',
    role:'ADMIN_ROLE',
    email:'juanperez@hotmail.com'
};
  return(
    <>
     <Routes>
        <Route path="" element={<Login/>}/>
        <Route path="/home" element={<Home user={user}/>}/>
        

      </Routes>
    </>
  )
}
