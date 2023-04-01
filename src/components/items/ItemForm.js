import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCategories } from "../ApiManager"
import { ListContext } from "../context/ListProvider"
import "./itemForm.css"






export const ItemForm = () => {
    const localPantryUser = localStorage.getItem("pantry_user")
    const pantryUserObj = JSON.parse(localPantryUser)
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const { renderSwitch, setRenderSwitch } = useContext(ListContext)

    const [item, updateItem] = useState({
        name: "",
        categoryId: 0,
        price: 0
    })



    useEffect(
        () => {
            getAllCategories()
                .then((categoryArr) => {
                    setCategories(categoryArr)
                })
        },
        []
    )






    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const itemToSendToAPI = {
            userId: pantryUserObj.id,
            name: item.name,
            categoryId: item.categoryId,
            price: item.price
        }



        return fetch(` http://localhost:8088/items`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(itemToSendToAPI)
        })
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
                                copy.categoryId = parseInt(evt.target.value)
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
                        // setRenderSwitch(!renderSwitch)
                        navigate("/items")

                    }}>Save</button>
                    <button className="cancelItem" onClick={() => { navigate(`/items`) }}>Cancel</button>
                </fieldset>
            </form>
        </section>
    </>

}