import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllCategories, getAllItems } from "../ApiManager"
import { ListContext } from "../context/ListProvider"





export const ListItemList = ({ searchTermState }) => {
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const { setCategoryId, renderSwitch, setRenderSwitch, listId } = useContext(ListContext)







    useEffect(
        () => {
            getAllItems()
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

    




    return <>

        <h2>Grocery Items</h2>

        <article>
            {
                filteredItems.map((item) => {
                    const match = categories.find(cat => cat.id === item.categoryId)
                    return <section>
                            -----------------------------
                        <div>
                            {item.name}
                            {
                                selectItemButton(item)
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