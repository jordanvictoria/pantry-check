import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ListContext } from "../context/ListProvider"
import { getItems, getItemsBySearch, deleteItem } from "./ItemManager"
import { ItemSearch } from "./ItemSearch"
import "./Item.css"





export const ItemList = () => {
    const { setCategoryId, renderSwitch, setRenderSwitch } = useContext(ListContext)
    const [items, setItems] = useState([])
    const [searchTerm, setSearchTerm] = useState('')



    useEffect(
        () => {
            getItems()
                .then((userItemArr) => {
                    setItems(userItemArr)
                })
        },
        [renderSwitch]
    )



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
                            })}
                    </ul>
                </div>
            </>
        } else {
            return <>
                <ItemSearch id="searchInput" onSearchTermChange={onSearchTermChange} searchTerm={searchTerm} />
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







