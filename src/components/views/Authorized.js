// import { Navigate, useLocation } from "react-router-dom"

// export const Authorized = ({ children }) => {
//     const location = useLocation()

//     if (localStorage.getItem("pantry_user")) {
//         return children
//     }
//     else {
//         return <Navigate
//             to={`/login/${location.search}`}
//             replace
//             state={{ location }} />
//     }
// }

import { Navigate, Outlet } from "react-router-dom"

export const Authorized = ({ token, children }) => {
  if (token) {
    console.log(token)
    return children
  }
  return <Navigate to='/login' replace />
}

