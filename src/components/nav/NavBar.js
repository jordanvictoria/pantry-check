import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <>



            <div className="back">
                    <div className="logo">
                        <img src={require('../images/pantryicon.jpg')} />
                    </div>
                <nav>


                    <div>

                        <Link to="/">Home</Link>
                    </div>

                    <div>

                        <Link to="/lists">Grocery Lists</Link>
                    </div>

                    <div>

                        <Link to="/items">Grocery Items</Link>
                    </div>
                    <div>

                        <Link to="/locations">Store Locations</Link>
                    </div>
                    <div className="logout">

                        {
                            localStorage.getItem("pantry_user")
                                ?
                                <Link to="" onClick={() => {
                                    localStorage.removeItem("pantry_user")
                                    navigate("/", { replace: true })
                                }}>Logout</Link>

                                : ""
                        }
                    </div>

                </nav>
            </div>



        </>

    )
}



