import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        fullName: ""
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("pantry_user", JSON.stringify({
                        id: createdUser.id
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <div class="center">
            <h1>Register for Pantry Check
            </h1>
            <form onSubmit={handleRegister}>
                <div class="inputbox">
                    <input onChange={updateUser}
                        type="text" id="fullName"
                        required autoFocus />
                    <span> Full Name </span>
                </div>
                <div class="inputbox">
                    <input onChange={updateUser}
                        type="email" id="email"
                        required />
                    <span> Email address </span>
                </div>
                <div class="inputbox">
                    <input type="submit" value="Register" />
                </div>
            </form>
        </div>
    )
}



