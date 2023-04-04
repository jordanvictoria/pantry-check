import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllCategories, getAllItems } from "../ApiManager"
import { ListContext } from "../context/ListProvider"
import "./listItemList.css"





export const ListItemList = ({ searchTermState }) => {
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const { setCategoryId, renderSwitch, setRenderSwitch, listId } = useContext(ListContext)
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
        []
    )

    useEffect(
        () => {
            setFilteredItems(items)
        },
        [items]
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









    const selectItemButton = (obj) => {

        return <Link to={`/selectedItems/${obj.id}/edit`}>
            <button
                onClick={() => {
                    setCategoryId(obj.categoryId)
                }}
            >Add To List</button>
        </Link>

    }


    const listItemFunc = () => {
        if (items.length !== 0) {
            return <>
                <section className="itemList">
                    <div className="listItemList">

                        <ul>
                            {
                                filteredItems.map((item) => {
                                    // const match = categories.find(cat => cat.id === item.categoryId)
                                    return <li>

                                        {item.name} - ${item.price}
                                        <span className="itemSpan">

                                            {
                                                selectItemButton(item)
                                            }
                                        </span>
                                    </li>
                                })

                            }
                        </ul>
                    </div>
                </section>
            </>
        } else {
            return ""
        }
    }




    return <>
        {
            listItemFunc()
        }


    </>

}

