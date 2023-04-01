import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCategories } from "../ApiManager"
import { ListContext } from "../context/ListProvider"
import "./listItemForm.css"






export const ListItemForm = () => {
    const localPantryUser = localStorage.getItem("pantry_user")
    const pantryUserObj = JSON.parse(localPantryUser)
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const { listId, renderSwitch, setRenderSwitch } = useContext(ListContext)

    const [item, updateItem] = useState({
        name: "",
        categoryId: 0,
        price: 0
    })

    const [listItem, updateListItem] = useState({
        itemId: 0,
        quantity: 0,
        priority: false

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

        let listItemToSendToAPI = {
            listId: listId,
            quantity: listItem.quantity,
            priority: listItem.priority
        }

        return fetch(` http://localhost:8088/items`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(itemToSendToAPI)
        })
            .then(response => response.json())
            .then(createdItem => {
                listItemToSendToAPI.itemId = parseInt(createdItem.id)
                fetch(` http://localhost:8088/listItems`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(listItemToSendToAPI)
                })
            })
            .then(() => {
                setRenderSwitch(!renderSwitch)
            })
    }













    return <>
    <section className="listItemForm">

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
                    <select className="listItemSelect" onChange={
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
                <div>Quantity:
                    <input id="quantity" onChange={
                        (evt) => {
                            const copy = { ...listItem }
                            copy.quantity = parseInt(evt.target.value)
                            updateListItem(copy)
                        }
                    } />
                </div>
                <div>
                    <label htmlFor="name">Priority:</label>
                    <input type="checkbox"
                        value={listItem.priority}
                        onChange={
                            (evt) => {
                                const copy = { ...listItem }
                                copy.priority = evt.target.checked
                                updateListItem(copy)
                            }
                        } />
                </div>

                <button onClick={(clickEvent) => {

                    handleSaveButtonClick(clickEvent)
                    // setRenderSwitch(!renderSwitch)
                    navigate(`/lists/${listId}`)

                }}>Save</button>
            <button className="cancelListItem" onClick={() => { navigate(`/lists/${listId}`) }}>Cancel</button>
            </fieldset>
        </form>
    </section>
    </>

}