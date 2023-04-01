import { useNavigate } from "react-router-dom"
import "./Item.css"

export const ItemSearch = ({ setterFunction }) => {
    const navigate = useNavigate()


    return <>
        <section className="itemList">
            <div class="list">

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
                    <button class="itemButton" onClick={() => {
                    navigate("/item/create")
                }
                }>Add Items</button>
                </span>
                </div>
            </div>
        </section>


    </>


}