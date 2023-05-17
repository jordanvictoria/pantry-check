import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllCategories, getAllItems } from "../ApiManager"
import { ListContext } from "../context/ListProvider"
import "./Item.css"





export const ItemList = ({ searchTermState }) => {
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const { setCategoryId, renderSwitch, setRenderSwitch } = useContext(ListContext)
    const localPantryUser = localStorage.getItem("pantry_user")
    const pantryUserObj = JSON.parse(localPantryUser)







    useEffect(
        () => {
            fetch(`http://localhost:8088/items?userId=${pantryUserObj.id}`)
                .then(res => res.json())
                .then((userItemArr) => {
                    setItems(userItemArr)
                })
        },
        [renderSwitch]
    )

    useEffect(
        () => {
            setFilteredItems(items)
        },
        [items, renderSwitch]
    )



    useEffect(
        () => {
            const searchedItems = items.filter(item => {
                return item.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredItems(searchedItems)
        },
        [searchTermState]
    )

    useEffect(
        () => {
            getAllCategories()
                .then((categoryArray) => {
                    setCategories(categoryArray)
                })
        },
        []
    )





    const editItemButton = (obj) => {

        return <Link to={`/items/${obj.id}/edit`}>
            <button class="button"
                onClick={() => {
                    setCategoryId(obj.categoryId)
                }}
            >Edit</button>
        </Link>

    }

    const deleteItemButton = (obj) => {
        return <>
            <button class="button" onClick={() =>
                fetch(`http://localhost:8088/items/${obj.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        setRenderSwitch(!renderSwitch)
                    })

            }>Remove</button>
        </>
    }

    const itemFunc = () => {
        if (items.length !== 0) {
            return <>
            
                {/* <section className="itemList"> */}
                    <div className="relativeList">

                        <ul>
                            {
                                filteredItems.map((item) => {
                                    const match = categories.find(cat => cat.id === item.categoryId)
                                    return <>



                                        <li>

                                            {item.name} - ${item.price}
                                            <span className="itemSpan">

                                                {
                                                    editItemButton(item)
                                                }
                                                {
                                                    deleteItemButton(item)
                                                }
                                            </span>
                                        </li>






                                    </>

                                })

                            }
                        </ul>
                    </div>
                {/* </section> */}




           
            </>
        } else {
            return <>
            <div className="bigDiv"></div>
            </>
        }
    }


    return <>

        {

            itemFunc()
        }
    </>

}







