

import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./auth/AuthProvider";
import { Home } from "./pages/Home/Home"
import { Login } from "./pages/Login/Login"
import { PrivateRoute } from "./routers/PrivateRoute";


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
