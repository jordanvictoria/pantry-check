import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import { getAllCategories, getAllItems } from "../ApiManager"
import { ListContext } from "../context/ListProvider"
import "./listItemList.css"
import { getCategories, getItems, getItemsBySearch } from "./ListItemManager"
import { ListItemSearch } from "./ListItemSearch"





export const ListItemList = ({ searchTermState }) => {
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const { setCategoryId, renderSwitch, setRenderSwitch, listId } = useContext(ListContext)
    // const localPantryUser = localStorage.getItem("pantry_user")
    // const pantryUserObj = JSON.parse(localPantryUser)
    const [searchTerm, setSearchTerm] = useState('')







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
    //         getCategories()
    //             .then((categoryArray) => {
    //                 setCategories(categoryArray)
    //             })
    //     },
    //     []
    // )
    // useEffect(
    //     () => {
    //         setFilteredItems(items)
    //     },
    //     [items]
    //     )
        


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

        <ListItemSearch id="searchInput" onSearchTermChange={onSearchTermChange} searchTerm={searchTerm} />
                <section className="itemList">
                    <div className="listItemList">

                        <ul>
                            {
                                items.map((item) => {
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

