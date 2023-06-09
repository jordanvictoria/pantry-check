import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Pantry Check</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/lists">Grocery Lists</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/items">Grocery Items</Link>
            </li>
            {
                localStorage.getItem("pantry_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("pantry_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

