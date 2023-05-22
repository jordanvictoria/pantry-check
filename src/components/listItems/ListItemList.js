import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ListContext } from "../context/ListProvider"
import "./listItemList.css"
import { getItems, getItemsBySearch } from "./ListItemManager"
import { ListItemSearch } from "./ListItemSearch"





export const ListItemList = ({ searchTermState }) => {
    const [items, setItems] = useState([])
    const { setCategoryId, renderSwitch } = useContext(ListContext)
    const [searchTerm, setSearchTerm] = useState('')







    useEffect(
        () => {
            getItems()
                .then((userItemArr) => {
                    setItems(userItemArr)
                    console.log(items)
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
            return <>

        <ListItemSearch id="searchInput" onSearchTermChange={onSearchTermChange} searchTerm={searchTerm} />
                <section className="itemList">
                    <div className="listItemList">

                        <ul>
                            {
                                items.map((item) => {
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

