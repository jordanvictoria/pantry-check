import { Navigate } from "react-router-dom"

export const Authorized = ({ token, children }) => {
  if (token) {
    return children
  }
  return <Navigate to='/login' replace />
}

