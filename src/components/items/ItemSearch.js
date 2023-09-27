import { useNavigate } from "react-router-dom"
import "./Item.css"

export const ItemSearch = ({ searchTerms, onSearchTermChange }) => {
    const navigate = useNavigate()

    return (

        <section className="searchItemsList">
            <h1 className="itemHeader">Grocery Items
            </h1>
            <div className="searchDiv">
                <input
                    value={searchTerms}
                    onChange={
                        (changeEvent) => {
                            onSearchTermChange(changeEvent.target.value)
                        }}
                    type="text" placeholder="Enter search term" />
                <button onClick={() => {
                    navigate("/item/create")
                }
                }>Add Items</button>
            </div>
        </section>
    )
}

