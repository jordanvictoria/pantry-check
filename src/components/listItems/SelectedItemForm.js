import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllCategories } from "../ApiManager"
import { ListContext } from "../context/ListProvider"
import "./listItemForm.css"

export const SelectedItemForm = () => {
    const { listId, renderSwitch, setRenderSwitch, categoryId } = useContext(ListContext)
    const { itemId } = useParams()
    const navigate = useNavigate()
    const [category, setCategory] = useState({})
    const [categories, setCategories] = useState([])
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




    useEffect(() => {
        fetch(`http://localhost:8088/items/${itemId}`)
            .then(response => response.json())
            .then((data) => {
                updateItem(data)
            })
    }, [itemId])



    useEffect(
        () => {
            getAllCategories()
                .then((categoryArr) => {
                    setCategories(categoryArr)
                })
        },
        []
    )

    useEffect(
        () => {
            getAllCategories()
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
            listId: listId,
            quantity: listItem.quantity,
            priority: listItem.priority
        }

        return fetch(` http://localhost:8088/items/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(item)
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
                                    copy.categoryId = parseInt(evt.target.value)
                                    updateItem(copy)
                                }
                            } >

                                <option value={item?.categoryId}>{category?.name}</option>
                                {
                                    categories.map(category => {
                                        return <option key={category.id} value={category.id}>{category.name}</option>
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

                        <button onClick={(clickEvent) => {

                            handleSaveButtonClick(clickEvent)
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