// import { useState } from "react"
// import { useNavigate } from "react-router-dom"


// export const Register = (props) => {
//     const [user, setUser] = useState({
//         email: "",
//         fullName: ""
//     })
//     let navigate = useNavigate()

//     const registerNewUser = () => {
//         return fetch("http://localhost:8088/users", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(user)
//         })
//             .then(res => res.json())
//             .then(createdUser => {
//                 if (createdUser.hasOwnProperty("id")) {
//                     localStorage.setItem("pantry_user", JSON.stringify({
//                         id: createdUser.id
//                     }))

//                     navigate("/")
//                 }
//             })
//     }

//     const handleRegister = (e) => {
//         e.preventDefault()
//         return fetch(`http://localhost:8088/users?email=${user.email}`)
//             .then(res => res.json())
//             .then(response => {
//                 if (response.length > 0) {
//                     // Duplicate email. No good.
//                     window.alert("Account with that email address already exists")
//                 }
//                 else {
//                     // Good email, create user.
//                     registerNewUser()
//                 }
//             })
//     }

//     const updateUser = (evt) => {
//         const copy = { ...user }
//         copy[evt.target.id] = evt.target.value
//         setUser(copy)
//     }


import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "./AuthManager"
import "./Register.css"

export const Register = ({ setToken }) => {
  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const username = useRef()
  const password = useRef()
  const verifyPassword = useRef()
  const passwordDialog = useRef()
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    
    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value
      }

      registerUser(newUser)
        .then(res => {
          if ("valid" in res && res.valid) {
            setToken(res.token)
            navigate("/")
          }
        })
    } else {
      passwordDialog.current.showModal()
    }
  }

    return (
        <div className="center">
            <h1>Register for Pantry Check
            </h1>
            <form onSubmit={handleRegister}>
            <div className="inputbox">
                    <input
                        type="text" ref={firstName}
                        required />
                    <span> First Name </span>
                </div>
                <div className="inputbox">
                    <input
                        type="text" ref={lastName}
                        required />
                    <span> Last Name </span>
                </div>
                <div className="inputbox">
                    <input
                        type="text" ref={username}
                        required />
                    <span> Username </span>
                </div>
                <div className="inputbox">
                    <input
                        type="email" ref={email}
                        required />
                    <span> Email address </span>
                </div>
                <div className="inputbox">
                    <input
                        type="password" ref={password}
                        required />
                    <span> Password </span>
                </div>
                <div className="inputbox">
                    <input
                        type="password" ref={verifyPassword}
                        required />
                    <span> Verify Password </span>
                </div>
                <div className="inputbox">
                    <input type="submit" />
                </div>
            </form>
        </div>
    )
}



