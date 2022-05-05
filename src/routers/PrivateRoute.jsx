import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth';

export const PrivateRoute = ({children}) => {

    const auth = useAuth();
  return auth.user||JSON.parse(localStorage.getItem('currentUser')) ? children : <Navigate to="/login" replace/>
}
