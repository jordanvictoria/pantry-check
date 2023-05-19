import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllCategories } from "../ApiManager"
import { ListContext } from "../context/ListProvider"
import "./listItemForm.css"
import { addListItem, editItem, getCategories, getItemById } from "./ListItemManager"

export const SelectedItemForm = () => {
    const localUser = localStorage.getItem('pantryUserId')
    const { listId, renderSwitch, setRenderSwitch, categoryId } = useContext(ListContext)
    const { itemId } = useParams()
    const navigate = useNavigate()
    const [category, setCategory] = useState({})
    const [categories, setCategories] = useState([])
    const [item, updateItem] = useState({
        id: 0,
        user: 0,
        name: "",
        category: 0,
        price: 0
    })
    const [listItem, updateListItem] = useState({
        quantity: 0,
        priority: false

    })




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

    useEffect(
        () => {
            getCategories()
                .then((categoryArr) => {
                    const categoryMatch = categoryArr.find(cat => cat.id === categoryId)
                    setCategory(categoryMatch)
                })
        },
        [categoryId]
    )



    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        let listItemToSendToAPI = {
            item: itemId,
            list: listId,
            quantity: listItem.quantity,
            priority: listItem.priority
        }
        const itemToSendToAPI = {
            id: itemId,
            user: parseInt(localUser),
            name: item.name,
            category: item.category.id,
            price: item.price
        }

        editItem(itemToSendToAPI)
        addListItem(listItemToSendToAPI)
            // .then(response => response.json())
            // .then(createdItem => {
            //     listItemToSendToAPI.item = parseInt(createdItem.id)
            // })
            // .then(() => {
            //     setRenderSwitch(!renderSwitch)
            // })
    }


    return <>
        <section className="listItemForm">
            <div className="relativeForm">
                <form>
                    <fieldset>
                        <div>Name:
                            <input type="text" id="name" placeholder={item.name} value={item.name} onChange={
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
                            <input type="text" id="price" placeholder={item.price} value={item.price} onChange={
                                (evt) => {
                                    const copy = { ...item }
                                    copy.price = evt.target.value
                                    updateItem(copy)
                                }
                            } />
                        </div>
                        <div>Quantity:
                            <input required autoFocus type="text" id="quantity" onChange={
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
                                value={listItem.priority}
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
                            // setRenderSwitch(!renderSwitch)
                            navigate(`/lists/${listId}`)

                        }}>Save</button>
                        <button className="cancelListItem" onClick={() => { navigate(`/lists/${listId}`) }}>Cancel</button>
                    </fieldset>
                </form>
            </div>
        </section>
    </>
}