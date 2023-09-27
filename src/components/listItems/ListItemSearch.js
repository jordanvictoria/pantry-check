import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getItems } from "./ListItemManager"
import "./listItemList.css"

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
                <div className="listItemsSearch">
                    <input className="listItemInput"
                        value={searchTerms}
                        onChange={
                            (changeEvent) => {
                                onSearchTermChange(changeEvent.target.value)
                            }}
                        type="text" placeholder="Enter search term" />
                    <div className="or">Or</div>
                    <button className="itemButton" onClick={() => {
                        navigate("/listItem/create")
                    }
                    }>Create New Item</button>
                </div>
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
        <section className="searchItemsList">
            <h1 className="itemHeader">Grocery Items
            </h1>
            <div>
                {
                    inputFunc()
                }
            </div>
        </section>
    )
}