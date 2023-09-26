import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ListContext } from "../context/ListProvider"
import { addItem, addListItem, getCategories, getListById } from "./ListItemManager"
import "./listItemForm.css"






export const ListItemForm = () => {
    const navigate = useNavigate()
    const { listId } = useContext(ListContext)
    const [categories, setCategories] = useState([])
    const [list, updateList] = useState({})
    const [item, updateItem] = useState({
        name: "",
        category: 0,
        price: 0
    })
    const [listItem, updateListItem] = useState({
        quantity: 0,
        priority: false

    })




    useEffect(
        () => {
            getListById(listId)
                .then((data) => {
                    updateList(data)
                })
        },
        [listId]
    )

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

        let listItemToSendToAPI = {
            list: listId,
            quantity: listItem.quantity,
            priority: listItem.priority
        }

        addItem(itemToSendToAPI)
            .then(response => response.json())
            .then(createdItem => {
                listItemToSendToAPI.item = parseInt(createdItem.id)
                addListItem(listItemToSendToAPI)
            })
        }

        














    return <div className="site-background">
    <section className="listItemFormContainer">
        <form className="relativeListItemForm">
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
                    <select className="listItemSelect" onChange={
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
                <div className="formDivs">
                <label>Quantity:</label>
                    <input id="quantity" onChange={
                        (evt) => {
                            const copy = { ...listItem }
                            copy.quantity = parseInt(evt.target.value)
                            updateListItem(copy)
                        }
                    } />
                </div>
                <div className="formDivs">
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
                    navigate(`/lists/${listId}`)
                }}>Save</button>
            <button className="cancelListItem" onClick={() => { navigate(`/lists/${listId}`) }}>Cancel</button>
            </fieldset>
        </form>
    </section>
    </div>

    }