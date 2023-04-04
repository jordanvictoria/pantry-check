import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllItems } from "../ApiManager"
import "./listItemList.css"

export const ListItemSearch = ({ setterFunction }) => {
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const localPantryUser = localStorage.getItem("pantry_user")
    const pantryUserObj = JSON.parse(localPantryUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/items?userId=${pantryUserObj.id}`)
                .then(res => res.json())
                .then((userItemArr) => {
                    setItems(userItemArr)
                })
        },
        []
    )



    const inputFunc = () => {
        if (items.length !== 0) {
            return <>
                <input className="listItemInput"
                    onChange={
                        (changeEvent) => {
                            setterFunction(changeEvent.target.value)
                        }
                    }

                    type="text" placeholder="Enter search term" />
                Or
                <span>

                    <button className="itemButton" onClick={() => {
                        navigate("/listItem/create")
                    }
                    }>Create New Item</button>
                </span>
            </>
        } else {
            return <>
                <div>

                    <button className="noInputButton" onClick={() => {
                        navigate("/listItem/create")
                    }
                    }>Create New Item</button>
                </div>
            </>
        }
    }

    return (
        <section className="itemList">

            <div className="listItemList">
                <h1 className="itemHeader">Grocery Items
                </h1>
                <div>

                    {
                        inputFunc()
                    }
                    {/* <span>

                        <button className="itemButton" onClick={() => {
                            navigate("/listItem/create")
                        }
                        }>Create New Item</button>
                    </span> */}
                </div>
            </div>
        </section>
    )
}