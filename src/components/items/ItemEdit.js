import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllCategories, getAllItems } from "../ApiManager"
import { ListContext } from "../context/ListProvider"
import "./itemForm.css"





export const ItemEdit = () => {
    // const localPantryUser = localStorage.getItem("pantry_user")
    // const pantryUserObj = JSON.parse(localPantryUser)
    const { renderSwitch, setRenderSwitch, categoryId } = useContext(ListContext)
    const [category, setCategory] = useState({})
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const { itemId } = useParams()
    const [item, updateItem] = useState({
        name: "",
        categoryId: 0,
        price: 0
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

        return fetch(` http://localhost:8088/items/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(item)
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
                                copy.categoryId = parseInt(evt.target.value)
                                updateItem(copy)
                            }
                        } >


                            <option value={item?.categoryId}>{category?.name}</option>
                            {
                                categories.map(category => {
                                    return <option key={category?.id} value={category?.id}>{category?.name}</option>
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

                    <button onClick={(clickEvent) => {

                        handleSaveButtonClick(clickEvent)
                        // setRenderSwitch(!renderSwitch)
                        navigate(`/items`)

                    }}>Save</button>
                    <button className="cancelItem" onClick={() => { navigate(`/items`) }}>Cancel</button>
                </fieldset>
            </form>
        </section>


    </>
}