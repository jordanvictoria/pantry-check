import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ListContext } from "../context/ListProvider"
import { editItem, getCategories, getItems, getItemById } from "./ItemManager"
import "./itemForm.css"





export const ItemEdit = () => {
    const localUser = localStorage.getItem('pantryUserId')
    const { renderSwitch, setRenderSwitch, categoryId } = useContext(ListContext)
    const [category, setCategory] = useState({})
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const { itemId } = useParams()
    const [item, updateItem] = useState({
        id: 0,
        user: 0,
        name: "",
        category: 0,
        price: 0
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










    const handleSaveButtonClick = () => {

        editItem({
            id: itemId,
            user: parseInt(localUser),
            name: item.name,
            category: item.category.id,
            price: item.price
        })
            .then(response => response.json())
            .then(() => {
                setRenderSwitch(!renderSwitch)
            })
    }













    return <>
        <section className="itemForm">
            <form className="relativeForm">
                <fieldset>
                    <div>Name:
                        <input required autoFocus type="text" id="name" placeholder={item.name} value={item.name} onChange={
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


                            <option value={item?.category}>{category?.name}</option>
                            {
                                categories.map(category => {
                                    return <option key={category?.id} value={category}>{category?.name}</option>
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

                    <button onClick={(event) => {
                        event.preventDefault()
                        handleSaveButtonClick()
                        navigate(`/items`)

                    }}>Save</button>
                    <button className="cancelItem" onClick={() => { navigate(`/items`) }}>Cancel</button>
                </fieldset>
            </form>
        </section>


    </>
}