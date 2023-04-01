import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllCategories, getAllItems } from "../ApiManager"
import { ListContext } from "../context/ListProvider"
import "./listItemForm.css"





export const ListItemEdit = () => {
    // const localPantryUser = localStorage.getItem("pantry_user")
    // const pantryUserObj = JSON.parse(localPantryUser)
    const { listId, renderSwitch, setRenderSwitch, itemId, categoryId } = useContext(ListContext)
    const [category, setCategory] = useState({})
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const { listItemId } = useParams()
    const [listItem, updateListItem] = useState({
        itemId: 0,
        quantity: 0,
        priority: false

    })
    const [item, updateItem] = useState({
        name: "",
        categoryId: 0,
        price: 0
    })



    useEffect(() => {
        fetch(`http://localhost:8088/listItems/${listItemId}`)
            .then(response => response.json())
            .then((data) => {
                updateListItem(data)
            })
    }, [listItemId])





    useEffect(() => {
        getAllItems()
            .then((itemArr) => {
                const matchedItem = itemArr.find(item => item.id === itemId)
                updateItem(matchedItem)
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

        return fetch(` http://localhost:8088/items/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .then(() => {
                fetch(` http://localhost:8088/listItems/${listItem.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(listItem)
                })
            })
            .then(() => {
                setRenderSwitch(!renderSwitch)
            })
    }




    // const isChecked = (listItem) => {
    //     if (listItem.priority) {
    //         return "checked"
    //     } else {
    //         return ""
    //     }
    // }








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