// import React, { useState } from "react"
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom"



// export const Login = () => {
    //     const [email, set] = useState("jordan@victoria.com")
    //     const navigate = useNavigate()
    
    //     const handleLogin = (e) => {
        //         e.preventDefault()
        
        //         return fetch(`http://localhost:8088/users?email=${email}`)
        //             .then(res => res.json())
        //             .then(foundUsers => {
            //                 if (foundUsers.length === 1) {
                //                     const user = foundUsers[0]
                //                     localStorage.setItem("pantry_user", JSON.stringify({
                    //                         id: user.id
                    //                     }))
                    
                    //                     navigate("/")
                    //                 }
                    //                 else {
                        //                     window.alert("Invalid login")
                        //                 }
                        //             })
                        //     }
                        


import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "./AuthManager"
import "./Login.css"
                        
export const Login = ({ setToken }) => {
  const username = useRef()
  const password = useRef()
  const navigate = useNavigate()
  const [isUnsuccessful, setisUnsuccessful] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()

    const user = {
      username: username.current.value,
      password: password.current.value
    }

    loginUser(user).then(res => {
      // console.log(res)
      if ("valid" in res && res.valid) {
        setToken(res.token, res.user_id)

        navigate("/")
      }
      else {
        setisUnsuccessful(true)
      }
    })
  }

    return (



        <div className="center">
            <h1>PantryCheck
            <img src={require('../images/pantryicon.jpg')}/>
            </h1>
            <h2>Sign In</h2>
            <form onSubmit={handleLogin}>
                <div className="inputbox">
                    <input className="emailInput" type="text" 
                        ref={username} required="required"/>
                        <span className="emailLabel">Username</span>
                </div>

                <div className="inputbox">
                    <input className="emailInput" type="text" 
                        ref={password} required="required"/>
                        <span className="emailLabel">Password</span>
                </div>

                <div className="inputbox">
                    <input type="submit" value="submit"/>
                </div>
            <Link to="/register">Not a member yet?</Link>
                
            </form>
        </div>
    )
}





