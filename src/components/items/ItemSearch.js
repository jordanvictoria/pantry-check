
import { useNavigate } from "react-router-dom"
import "./Item.css"

export const ItemSearch = ({ searchTerms, onSearchTermChange }) => {
    const navigate = useNavigate()





    

    return (

        
        <section className="itemList">

                <h1 className="itemHeader">Grocery Items
                </h1>

                <div>

                <input
                    value={searchTerms}
                    onChange={
                      (changeEvent) => {
                        onSearchTermChange(changeEvent.target.value)
                      }}
                    type="text" placeholder="Enter search term" />
                    <span>
                        <button className="itemButton" onClick={() => {
                            navigate("/item/create")
                        }
                        }>Add Items</button>
                    </span>
                </div>
        </section>
       


    )


}