import React from 'react'
import { Navigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth';

export const AdminRoute = ({children}) => {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const userRole = currentUser.role
   return userRole == 'ADMINISTRADOR'? children : <Navigate to="/home" replace/>;
    
  
}
