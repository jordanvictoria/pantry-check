
import { useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
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
                        setToken(res.token, res.user_id)
                        navigate("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <div className="registerCenter">
            <h1>Register for Pantry Check
            </h1>
            <form onSubmit={handleRegister}>
                <div className="register-inputbox">
                    <input
                        type="text" ref={firstName}
                        required />
                    <span> First Name </span>
                </div>
                <div className="register-inputbox">
                    <input
                        type="text" ref={lastName}
                        required />
                    <span> Last Name </span>
                </div>
                <div className="register-inputbox">
                    <input
                        type="text" ref={username}
                        required />
                    <span> Username </span>
                </div>
                <div className="register-inputbox">
                    <input
                        type="email" ref={email}
                        required />
                    <span> Email address </span>
                </div>
                <div className="register-inputbox">
                    <input
                        type="password" ref={password}
                        required />
                    <span> Password </span>
                </div>
                <div className="register-inputbox">
                    <input
                        type="password" ref={verifyPassword}
                        required />
                    <span> Verify Password </span>
                </div>
                <div className="register-inputbox">
                        <input type="submit" />
                        <Link to="/login" className="cancelRegister">Cancel</Link>
                   
                </div>
            </form>
        </div>
    )
}



