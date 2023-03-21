import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllCategories, getAllItems } from "../ApiManager"
import { ListContext } from "../context/ListProvider"





export const ItemList = ({ searchTermState }) => {
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const { setCategoryId, renderSwitch, setRenderSwitch } = useContext(ListContext)







    useEffect(
        () => {
            getAllItems()
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
                <button
                onClick={() => {
                    setCategoryId(obj.categoryId)
                }}
                >Edit</button>
            </Link>
        
    }

    const deleteItemButton = (obj) => {
        return <>
            <button onClick={() =>
                fetch(`http://localhost:8088/items/${obj.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        setRenderSwitch(!renderSwitch)
                    })

            }>Remove</button>
        </>
    }




    return <>

        <h2>Grocery Items</h2>

        <button onClick={() => {
            navigate("/item/create")
        }
        }>Add Items</button>

        <article>
            {
                filteredItems.map((item) => {
                    const match = categories.find(cat => cat.id === item.categoryId)
                    return <section>
                            -----------------------------
                        <div>
                            {item.name}
                            {
                                editItemButton(item)
                            }
                            {
                                deleteItemButton(item)
                            }
                        </div>
                        <div>Price: ${item.price} </div>
                        <div>Category: {match?.name}</div>
                        -----------------------------
                    </section>
                })

            }
        </article>

    </>

}