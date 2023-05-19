import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ListContext } from "../context/ListProvider"
import { getItems, getCategories, getItemsBySearch, deleteItem } from "./ItemManager"
import { ItemSearch } from "./ItemSearch"
import "./Item.css"





export const ItemList = () => {
    const [items, setItems] = useState([])
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const { setCategoryId, renderSwitch, setRenderSwitch } = useContext(ListContext)
    const localUser = localStorage.getItem('pantryUserId')
    const [searchTerm, setSearchTerm] = useState('')
    // const [filteredItems, setFilteredItems] = useState([])



    useEffect(
        () => {
            getItems()
                .then((userItemArr) => {
                    setItems(userItemArr)
                    console.log(items)
                })
            getCategories()
                .then((categoryArray) => {
                    setCategories(categoryArray)
                })
        },
        [renderSwitch]
    )

    // useEffect(
    //     () => {
    //         setFilteredItems(items)
    //     },
    //     [items, renderSwitch]
    // )



    // useEffect(
    //     () => {
    //         const searchedItems = items.filter(item => {
    //             return item.name.toLowerCase().startsWith(searchTermState.toLowerCase())
    //         })
    //         setFilteredItems(searchedItems)
    //     },
    //     [searchTermState]
    // )










    useEffect(() => {
        if (searchTerm.length > 1) {
            getItemsBySearch(searchTerm).then((items) => setItems(items))
        } else {
            getItems().then((items) => setItems(items))
        }
    }, [searchTerm])





    const onSearchTermChange = (value) => {
        setSearchTerm(value)
    }

   





    const editItemButton = (obj) => {

        return <Link to={`/items/${obj.id}/edit`}>
            <button class="button"
                onClick={() => {
                    setCategoryId(obj.category.id)
                }}
            >Edit</button>
        </Link>

    }

    const deleteItemButton = (obj) => {
        return <>
            <button class="button" onClick={() =>
                deleteItem(obj.id).then(() => setRenderSwitch(!renderSwitch))

            }>Remove</button>
        </>
    }





    const itemFunc = () => {
        if (items.length !== 0) {
            return <>
            
            <ItemSearch id="searchInput" onSearchTermChange={onSearchTermChange} searchTerm={searchTerm} />
                    <div className="relativeList">

                        <ul>
                            {
                                items.map((item) => {
                                    console.log(item)
                                    // const match = categories.find(cat => cat.id === item.categoryId)
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







