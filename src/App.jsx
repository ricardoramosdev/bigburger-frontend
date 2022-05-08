

import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./auth/AuthProvider";
import { Home } from "./pages/Home/Home"
import { Login } from "./pages/Login/Login"
import { Products } from './pages/Products/Products';
import { UserList } from "./pages/Users/UserList/UserList";
import { AdminRoute } from "./routers/AdminRoute";
import { PrivateRoute } from "./routers/PrivateRoute";
import { User } from "./pages/Users/user"

export const App = () =>{

  return(
    <>


    <AuthProvider>
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route path="/*" element={<PrivateRoute><Home /></PrivateRoute>}/>               
        </Routes>
      </AuthProvider>

    </>
  )
}
