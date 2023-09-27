import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addItem, getCategories } from "./ItemManager"
import "./itemForm.css"






export const ItemForm = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [item, updateItem] = useState({
        name: "",
        category: 0,
        price: 0
    })



    useEffect(
        () => {
            getCategories()
                .then((categoryArr) => {
                    setCategories(categoryArr)
                })
        },
        []
    )






    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const itemToSendToAPI = {
            name: item.name,
            category: item.category,
            price: item.price
        }

        addItem(itemToSendToAPI)
            .then((res) => res.json())
    }













    return <div className="site-background">
    <section className="itemFormContainer">
            <form className="relativeForm">
                <fieldset>
                    <div className="formDivs">
                        <label>Name:</label>
                        <input type="text" id="name" onChange={
                            (evt) => {
                                const copy = { ...item }
                                copy.name = evt.target.value
                                updateItem(copy)
                            }
                        } />

                    </div>
                    <div className="formDivs">
                        <label>Category:</label>
                        <select className="itemSelect" onChange={
                            (evt) => {
                                const copy = { ...item }
                                copy.category = parseInt(evt.target.value)
                                updateItem(copy)
                            }
                        } >

                            <option value="0">Choose A Category...</option>
                            {
                                categories.map(category => {
                                    return <option key={category.id} value={category.id}>{category.name}</option>
                                })
                            }


                        </select>
                    </div>
                    <div className="formDivs">
                        <label>Price:</label>
                        <input id="price" onChange={
                            (evt) => {
                                const copy = { ...item }
                                copy.price = parseInt(evt.target.value)
                                updateItem(copy)
                            }
                        } />
                    </div>
                    <button onClick={(clickEvent) => {
                        handleSaveButtonClick(clickEvent)
                        navigate("/items")
                    }}>Save</button>
                    <button className="cancelItem" onClick={() => { navigate(`/items`) }}>Cancel</button>
                </fieldset>
            </form>
        </section>
    </div>

}