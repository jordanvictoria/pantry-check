import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ListContext } from "../context/ListProvider"
import { editItem, editListItem, getCategories, getItemById, getListItemById } from "./ListItemManager"
import "./listItemForm.css"





export const ListItemEdit = () => {
    const localUser = localStorage.getItem('pantryUserId')
    const navigate = useNavigate()
    const { listId, itemId } = useContext(ListContext)
    const { listItemId } = useParams()
    const [categories, setCategories] = useState([])
    const [listItem, updateListItem] = useState({
        id: 0,
        user: 0,
        list: 0,
        item: 0,
        quantity: 0,
        priority: false

    })
    const [item, updateItem] = useState({
        id: 0,
        user: 0,
        name: "",
        category: 0,
        price: 0
    })




    useEffect(() => {
        getListItemById(listItemId)
            .then((data) => {
                updateListItem(data)
            })
    }, [listItemId])

    useEffect(() => {
        getItemById(itemId)
            .then((data) => {
                updateItem(data)
            })
    }, [itemId])

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
        editItem({
            id: itemId,
            user: parseInt(localUser),
            name: item.name,
            category: item.category.id,
            price: item.price
        })
            .then(() => {
                editListItem({
                    id: listItemId,
                    user: parseInt(localUser),
                    list: listId,
                    item: itemId,
                    quantity: listItem.quantity,
                    priority: listItem.priority

                })
            })
    }












    return <>

        <section className="listItemForm">
            <form className="relativeForm">
                <fieldset>
                    <div>Name:
                        <input required autoFocus type="text" id="name" placeholder={item?.name} value={item?.name} onChange={
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


                            <option value={item?.category}>{item.category.name}</option>
                            {
                                categories.map(category => {
                                    return <option key={category.id} value={category}>{category.name}</option>
                                })
                            }


                        </select>
                    </div>
                    <div>Price:
                        <input type="text" id="price" placeholder={item?.price} value={item?.price} onChange={
                            (evt) => {
                                const copy = { ...item }
                                copy.price = evt.target.value
                                updateItem(copy)
                            }
                        } />
                    </div>
                    <div>Quantity:
                        <input type="text" id="quantity" placeholder={listItem?.quantity} value={listItem?.quantity} onChange={
                            (evt) => {
                                const copy = { ...listItem }
                                copy.quantity = evt.target.value
                                updateListItem(copy)
                            }
                        } />
                    </div>
                    <div>
                        <label htmlFor="name">Priority:</label>
                        <input type="checkbox"
                            value={listItem?.priority}
                            checked={listItem?.priority}
                            onChange={
                                (evt) => {
                                    const copy = { ...listItem }
                                    copy.priority = evt.target.checked
                                    updateListItem(copy)
                                }
                            } />
                    </div>

                    <button onClick={(event) => {
                        handleSaveButtonClick(event)
                        navigate(`/lists/${listId}`)

                    }}>Save</button>
                    <button className="cancelListItem" onClick={() => { navigate(`/lists/${listId}`) }}>Cancel</button>
                </fieldset>
            </form>
        </section>
    </>
}