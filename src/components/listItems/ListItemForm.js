import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
// import { getAllCategories } from "../ApiManager"
import { ListContext } from "../context/ListProvider"
import "./listItemForm.css"
import { addItem, addListItem, getCategories, getListById } from "./ListItemManager"






export const ListItemForm = () => {
    const localUser = localStorage.getItem('pantryUserId')
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const { listId, renderSwitch, setRenderSwitch } = useContext(ListContext)
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
            getCategories()
                .then((categoryArr) => {
                    setCategories(categoryArr)
                })
        },
        []
    )

    useEffect(
        () => {
            getListById(listId)
                .then((data) => {
                    updateList(data)
                })
        },
        [listId, renderSwitch]
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
            // .then(response => response.json())
            // .then(() => {
            //     setRenderSwitch(!renderSwitch)
            // })
            // .then(() =>
            // navigate(`/lists/${list.id}`)
            // )
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

                    setRenderSwitch(!renderSwitch)
                    handleSaveButtonClick(clickEvent)
                    navigate(`/lists/${listId}`)

                }}>Save</button>
            <button className="cancelListItem" onClick={() => { navigate(`/lists/${listId}`) }}>Cancel</button>
            </fieldset>
        </form>
    </section>
    </>

    }