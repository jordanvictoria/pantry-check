import { useNavigate } from "react-router-dom"
import "./Item.css"

export const ItemSearch = ({ setterFunction }) => {
    const navigate = useNavigate()


    return <>
        <section>
            <div class="list">

                <h1>Grocery Items
                <span>
                    <button class="button" onClick={() => {
                    navigate("/item/create")
                }
                }>Add Items</button>
                </span>
                </h1>
                
                <div>

                <input
                    onChange={
                        (changeEvent) => {
                            setterFunction(changeEvent.target.value)
                        }
                    }

                    type="text" placeholder="Enter search term" />
                </div>
            </div>
        </section>


    </>


}