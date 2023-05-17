import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllItems } from "../ApiManager"
import "./Item.css"

export const ItemSearch = ({ setterFunction }) => {
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






    return (

        
        <section className="itemList">
            {/* <div className="relativeList"> */}

                <h1 className="itemHeader">Grocery Items
                </h1>

                <div>

                <input
                    onChange={
                        (changeEvent) => {
                            setterFunction(changeEvent.target.value)
                        }
                    }

                    type="text" placeholder="Enter search term" />
                    <span>
                        <button className="itemButton" onClick={() => {
                            navigate("/item/create")
                        }
                        }>Add Items</button>
                    </span>
                </div>
            {/* </div> */}
        </section>
       


    )


}