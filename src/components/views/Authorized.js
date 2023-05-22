import { Navigate, Outlet } from "react-router-dom"

export const Authorized = ({ token, children }) => {
  if (token) {
    console.log(token)
    return children
  }
  return <Navigate to='/login' replace />
}

