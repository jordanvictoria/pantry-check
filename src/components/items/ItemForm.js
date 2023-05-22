import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ListContext } from "../context/ListProvider"
import "./itemForm.css"
import { addItem, getCategories } from "./ItemManager"






export const ItemForm = () => {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const { renderSwitch, setRenderSwitch } = useContext(ListContext)

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
            .then(() => {
                setRenderSwitch(!renderSwitch)
            })
    }













    return <>
        <section className="itemForm">
            <form className="relativeForm">
                <fieldset>
                    <div>Name:
                        <input type="text" id="name" onChange={
                            (evt) => {
                                const copy = { ...item }
                                copy.name = evt.target.value
                                updateItem(copy)
                            }
                        } />
                        
                    </div>
                    <div>
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
                    <div>Price:
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
    </>

}