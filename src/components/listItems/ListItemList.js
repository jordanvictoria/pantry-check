import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ListContext } from "../context/ListProvider"
import { getItems, getItemsBySearch } from "./ListItemManager"
import { ListItemSearch } from "./ListItemSearch"
import "./listItemList.css"





export const ListItemList = ({ searchTermState }) => {
    const { setCategoryId, renderSwitch } = useContext(ListContext)
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
            return <div className="site-background">
                <section className="listItemsContainer">
                <ListItemSearch id="searchInput" onSearchTermChange={onSearchTermChange} searchTerm={searchTerm} />
                    <div className="listItemsList">
                        <ul>
                            {
                                items.map((item) => {
                                    return <li className="listItemElements"
                                    key={`item--${item.id}`}>
                                        {item.name} - ${item.price}
                                        <div className="itemButtons">
                                            {
                                                selectItemButton(item)
                                            }
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </section>
            </div>
        } else {
            return <div className="site-background">
                <section className="listItemsContainer">
                <ListItemSearch id="searchInput" onSearchTermChange={onSearchTermChange} searchTerm={searchTerm} />
                    </section>
                
            </div>
        }
    }





    return <>
        {
            listItemFunc()
        }
    </>
}

