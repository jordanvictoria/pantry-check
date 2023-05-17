import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = ({ setToken }) => {
    const navigate = useNavigate()

    return (
        <>



            <div className="back">
                    <div className="logo">
                        <img src={require('../images/pantryicon.jpg')} />
                    </div>
                <nav>


                    <div>

                        <Link style={{ textDecoration: 'none' }} to="/">Home</Link>
                    </div>

                    <div>

                        <Link style={{ textDecoration: 'none' }} to="/lists">Grocery Lists</Link>
                    </div>

                    <div>

                        <Link style={{ textDecoration: 'none' }} to="/items">Grocery Items</Link>
                    </div>
                    <div>

                        <Link style={{ textDecoration: 'none' }} to="/locations">Find A Store</Link>
                    </div>
                    <div className="logout">
                        <Link style={{ textDecoration: 'none' }} to="" onClick={() => {
                            setToken("");
                            navigate("/login");
                            }}>Logout</Link>
                    </div>

                </nav>
            </div>



        </>

    )
}



