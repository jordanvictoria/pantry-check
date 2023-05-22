import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./listItemList.css"
import { getItems } from "./ListItemManager"

export const ListItemSearch = ({ searchTerms, onSearchTermChange }) => {
    const navigate = useNavigate()
    const [items, setItems] = useState([])

    useEffect(
        () => {
            getItems()
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
                    value={searchTerms}
                    onChange={
                      (changeEvent) => {
                        onSearchTermChange(changeEvent.target.value)
                      }}

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
                </div>
            </div>
        </section>
    )
}