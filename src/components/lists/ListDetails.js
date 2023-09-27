import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ReactComponent as YellowStar } from "../images/favorite-star-yellow.svg"
import { ReactComponent as BlankStar } from "../images/favorite-star-blank.svg"
import { getCategories, getListById, getItemsByList, deleteListItem, editList, getItemsByHttpString, deleteList } from "./ListManager"
import { ListContext } from "../context/ListProvider"
import "./listDetail.css"


export const ListDetails = () => {
    const localUser = localStorage.getItem('pantryUserId')
    const { listId } = useParams()
    const navigate = useNavigate()
    const [listItems, setListItems] = useState([])
    const [categories, setCategories] = useState([])
    const [filteredByCategory, setFilteredByCategory] = useState(0)
    const [filteredByPriority, setFilteredByPriority] = useState(false)
    const [list, updateList] = useState({})
    const { renderSwitch, setRenderSwitch, setListId, setItemId, setCategoryId } = useContext(ListContext)


    useEffect(
        () => {
            getListById(listId)
                .then((data) => {
                    updateList(data)
                })
            getItemsByList(listId)
                .then((listItemArray) => {
                    setListItems(listItemArray)
                })
        },
        [listId, renderSwitch]
    )


    useEffect(
        () => {
            getCategories()
                .then((categoryArray) => {
                    setCategories(categoryArray)
                })
        },
        []
    )


    useEffect(
        () => {
            if (filteredByCategory !== 0 || filteredByPriority !== false || listId !== 0) {
                getItemsByHttpString(queryStrings(listId, parseInt(filteredByCategory), filteredByPriority))
                    .then((data) => { setListItems(data) })
            }

        }, [listId, filteredByCategory, filteredByPriority]
    )



    const queryStrings = (listId, filteredByCategory, filteredByPriority) => {
        let httpString = []

        if (filteredByCategory !== 0) {
            httpString.push(`category=${parseInt(filteredByCategory)}`)
        }
        if (filteredByPriority !== false) {
            httpString.push(`priority=${filteredByPriority}`)
        }
        if (listId !== 0) {
            httpString.push(`listId=${listId}`)
        }
        let newString = httpString.join("&")
        return newString
    }




    const addItemButton = () => {
        if (!list.completed) {
            return <>
                <button onClick={() => {
                    setListId(list.id)
                    navigate("/listItems")
                }
                }>Add Items</button>
            </>

        } else {
            return ""
        }
    }


    const editItemButton = (obj) => {
        if (!list.completed) {
            return <Link to={`/listItems/${obj.id}/edit`}>
                <button
                    onClick={() => {
                        setItemId(obj.item.id)
                        setListId(list.id)
                        setCategoryId(obj.item.category.id)
                    }}>Edit</button>
            </Link>
        } else {
            return ""
        }
    }


    const removeListItemButton = (id) => {
        return <>
            <button onClick={() =>
                deleteListItem(id)
                    .then(() => {
                        setRenderSwitch(!renderSwitch)
                    })
            }>Remove</button>
        </>
    }



    const editListButton = () => {
        if (!list.completed) {
            return <Link to={`/lists/${list.id}/edit`}>
                <button>Edit List</button>
            </Link>
        } else {
            return ""
        }
    }

    const markCompleteButton = () => {
        if (!list.completed) {
            return <button className="markCompleted"
                onClick={(event) => {
                    event.preventDefault()
                    const copy = {
                        id: listId,
                        user: parseInt(localUser),
                        name: list.name,
                        notes: list.notes,
                        date_created: list.date_created,
                        completed: true,
                        date_completed: newDate
                    }
                    editList(copy)
                        .then(() => {
                            setRenderSwitch(!renderSwitch)
                        })
                }}
            >Mark as Completed</button>
        } else {
            return <>
                <button className="listCompleted"
                    onClick={(event) => {
                        event.preventDefault()
                        const copy = {
                            id: listId,
                            user: parseInt(localUser),
                            name: list.name,
                            notes: list.notes,
                            date_created: list.date_created,
                            completed: false,
                            date_completed: null
                        }
                        editList(copy)
                            .then(() => {
                                setRenderSwitch(!renderSwitch)
                            })
                    }}>Completed on {list.date_completed}</button>
            </>
        }
    }



    var dateObj = new Date();
    var month = ('0' + (dateObj.getUTCMonth() + 1)).slice(-2);
    var day = ('0' + dateObj.getUTCDate()).slice(-2);
    var year = dateObj.getUTCFullYear();
    const newDate = year + "-" + month + "-" + day;


    let estimatedTotalCost = 0












    return <div className="site-background">
        <section className="listContainer">
            <div className="relativeList">
                <div className="listName">
                    <h3 className="nameMargin">
                        {list.name}</h3>
                    {addItemButton()}
                </div>

                <div className="filterContainer">
                    <div className="filterOne">
                        Filter by Category
                        <select className="listDetailInput" onChange={
                            (evt) => {
                                setFilteredByCategory(evt.target.value)
                            }
                        } >
                            <option value="0">Choose A Category...</option>
                            {
                                categories.map(category => {
                                    return <option key={category?.id} value={category?.id}>{category?.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="filterTwo">
                        Show Priority Only 
                        <input className="priorityCheckbox" type="checkbox" onClick={() => setFilteredByPriority(!filteredByPriority)} />
                    </div>
                </div>

                <section className="listDetailItems">
                    <ul className="unorderedListElement">
                        {
                            listItems.map(listItem => {
                                const matchedCategory = categories.find(category => category?.id === listItem?.item?.category.id)
                                const totalPrice = listItem?.quantity * listItem?.item?.price
                                estimatedTotalCost += totalPrice

                                return (
                                    <li className="listElement">
                                        <section>
                                            <header className="groceryHeader">
                                                <section className="groceryName">
                                                    <input className="checkbox" type="checkbox" />
                                                    {listItem?.item?.name}
                                                    {listItem?.priority ? <YellowStar className="svg"></YellowStar> : <BlankStar className="svg"></BlankStar>}
                                                </section>
                                                <div className="groceryButtons">
                                                    <section className="buttonFontSizes">
                                                        {
                                                            editItemButton(listItem)
                                                        }
                                                        {
                                                            removeListItemButton(listItem?.id)
                                                        }
                                                    </section>
                                                    <div className="groceryFacts">
                                                        <section className="groceryCategory">
                                                            Category: {matchedCategory?.name}
                                                        </section>
                                                        <section className="groceryQuantity">
                                                            Quantity: {listItem?.quantity}
                                                        </section>

                                                        <section className="groceryPrice">
                                                            Price: ${totalPrice}
                                                        </section>
                                                    </div>
                                                </div>
                                            </header>
                                        </section>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </section>
                <section className="estimatedCost">
                    <div className="cost">Estimated Total: ${estimatedTotalCost}</div>
                </section>

                <section className="listNotes">
                    <div className="notes">Notes: {list?.notes}</div>
                </section>
                <footer className="allButtons">
                    {
                        markCompleteButton()
                    }
                    <div className="someButtons">
                        {
                            editListButton()
                        }
                        <button onClick={() =>
                            deleteList(list.id)
                                .then(() => {
                                    navigate("/lists")
                                })
                        }>Delete List</button>
                    </div>
                </footer>
            </div>
        </section>
    </div>
}
