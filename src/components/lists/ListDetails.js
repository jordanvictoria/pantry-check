import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ReactComponent as YellowStar } from "../images/favorite-star-yellow.svg"
import { ReactComponent as BlankStar } from "../images/favorite-star-blank.svg"
import { getAllCategories } from "../ApiManager"
import "./list.css"
import { ListContext } from "../context/ListProvider"


export const ListDetails = () => {
    const { listId } = useParams()
    const navigate = useNavigate()
    const [list, updateList] = useState({})
    const [listItems, setListItems] = useState([])
    const [allListItems, setAllListItems] = useState([])
    const [categories, setCategories] = useState([])
    const [filteredByCategory, setFilteredByCategory] = useState(0)
    const [filteredByPriority, setFilteredByPriority] = useState(false)
    const [stateOfFilter, setStateOfFilter] = useState({})
    const [filterUpdated, setFilterUpdated] = useState(false)

    const { renderSwitch, setRenderSwitch, setListId, setItemId, setCategoryId } = useContext(ListContext)


    useEffect(
        () => {
            fetch(`http://localhost:8088/lists/${listId}`)
                .then(response => response.json())
                .then((data) => {
                    updateList(data)
                })
        },
        [listId, renderSwitch]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/listItems?_expand=item&listId=${listId}`)
                .then(response => response.json())
                .then((listItemArray) => {
                    setAllListItems(listItemArray)
                    setListItems(listItemArray)
                })
        },
        [listId, renderSwitch]
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

    useEffect(
        () => {
            stateOfFilter.selectedCategory = parseInt(filteredByCategory)
            setFilterUpdated(!filterUpdated)

        },
        [filteredByCategory]
    )

    useEffect(
        () => {
            stateOfFilter.priorityOnly = filteredByPriority
            setFilterUpdated(!filterUpdated)

        },
        [filteredByPriority]
    )





    useEffect(
        () => {
            if (allListItems) {
                let filteredItems = allListItems
                if (stateOfFilter.selectedCategory) {
                    filteredItems = filteredItems.filter(listItem => listItem?.item?.categoryId === stateOfFilter.selectedCategory)
                }
                if (filteredByPriority === true) {
                    let priorityItems = []
                            {
                                allListItems.map(li => {
                                    if (li?.priority === true) {
                                        priorityItems.push(li)
                                    }
                                })
                            }
                            console.log(priorityItems)

                    let priorityArr = []
                    priorityItems.map(itemP => {
                        let starred = filteredItems.find(itemF => itemF?.id === itemP?.id)
                        if (starred) {
                            priorityArr.push(starred)
                        }
                        
                    })
                    filteredItems = priorityArr
                }
                setListItems(filteredItems)
            }
        },
        [filterUpdated, allListItems]
    )











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
                        setItemId(obj.itemId)
                        setListId(list.id)
                        setCategoryId(obj.item.categoryId)
                    }}>Edit</button>
            </Link>
        } else {
            return ""
        }
    }


    const removeListItemButton = (id) => {
        return <>
            <button onClick={() =>
                fetch(`http://localhost:8088/listItems/${id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        setRenderSwitch(!renderSwitch)
                    })

            }>Remove</button>
        </>
    }





    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    const newDate = month + "/" + day + "/" + year



    const markCompleteButton = () => {
        if (!list.completed) {
            return <button
                onClick={() => {
                    const copy = {
                        userId: 1,
                        name: list.name,
                        notes: list.notes,
                        dateCreated: list.dateCreated,
                        completed: true,
                        dateCompleted: newDate
                    }
                    fetch(`http://localhost:8088/lists/${list.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(copy)
                    })
                        .then(response => response.json())
                        .then(() => {
                            setRenderSwitch(!renderSwitch)
                        })
                }}
            >Mark as Completed</button>
        } else {
            return `Completed on ${list.dateCompleted}`
        }
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







    let estimatedTotalCost = 0

    return <>

        <article>

            <h3>{list?.name}</h3>
            <div>
                {addItemButton()}
                <div>
                    Filter by Category
                    <select onChange={
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
                    Show Priority Only
                    <input type="checkbox" onClick={() => setFilteredByPriority(!filteredByPriority)} />
                </div>
            </div>
            <section>
                <ul>
                    {
                        listItems.map(listItem => {
                            const matchedCategory = categories.find(category => category?.id === listItem?.item?.categoryId)
                            const totalPrice = listItem?.quantity * listItem?.item?.price
                            estimatedTotalCost += totalPrice

                            return (
                                <li>
                                    <section>
                                        <header>{listItem?.item?.name}
                                            {listItem?.priority ? <YellowStar className="svg"></YellowStar> : <BlankStar className="svg"></BlankStar>} --
                                            Quantity: {listItem?.quantity} --
                                            Price: {totalPrice}
                                        </header>
                                    </section>
                                    <section>
                                        Category: {matchedCategory?.name} --
                                        {
                                            editItemButton(listItem)
                                        }
                                        {
                                            removeListItemButton(listItem?.id)
                                        }
                                    </section>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
            <section>
                <div>-------------------------- Estimated Total: {estimatedTotalCost}</div>
                <div>Notes: {list?.notes}</div>
            </section>
            <footer>
                {
                    markCompleteButton()
                }
                {
                    editListButton()
                }
                ------------
                <button onClick={() =>
                    fetch(`http://localhost:8088/lists/${list?.id}`, {
                        method: "DELETE"
                    })
                        .then(() => {
                            navigate("/lists")
                        })

                }>Delete List</button>
            </footer>

        </article>
    </>
}