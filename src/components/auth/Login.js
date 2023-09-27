import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "./AuthManager"
import "./Login.css"

export const Login = ({ setToken }) => {
  const username = useRef()
  const password = useRef()
  const navigate = useNavigate()
  const [isUnsuccessful, setisUnsuccessful] = useState(false)
  const [defaultUsername, setDefaultUsername] = useState("Al_Dente")
  const [defaultPassword, setDefaultPassword] = useState("me")

  const handleLogin = (e) => {
    e.preventDefault()

    const user = {
      username: username.current.value || defaultUsername,
      password: password.current.value || defaultPassword
    }

    loginUser(user).then(res => {
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
        <img alt="item of a basket with groceries" src={require('../images/pantryicon.jpg')} />
      </h1>
      <h2>Sign In</h2>
      <form onSubmit={handleLogin}>
        <div className="inputbox">
          <input
            className="emailInput"
            type="text"
            ref={username}
            value={defaultUsername}
            onChange={e => setDefaultUsername(e.target.value)}
            required="required"
          />
          <span className="emailLabel">Username</span>
        </div>

        <div className="inputbox">
          <input
            className="emailInput"
            type="password"
            ref={password}
            value={defaultPassword}
            onChange={e => setDefaultPassword(e.target.value)}
            required="required"
          />
          <span className="emailLabel">Password</span>
        </div>

        <div className="inputbox">
          <input type="submit" value="submit" />
        </div>
        <Link to="/register">Not a member yet?</Link>

      </form>
    </div>
  )
}





