import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ReactComponent as YellowStar } from "../images/favorite-star-yellow.svg"
import { ReactComponent as BlankStar } from "../images/favorite-star-blank.svg"
import { getCategories, getListById, getItemsByList, deleteListItem, editList, getItemsByHttpString } from "./ListManager"
import "./listDetail.css"
import { ListContext } from "../context/ListProvider"


export const ListDetails = () => {
    const { listId } = useParams()
    const navigate = useNavigate()
    const [listItems, setListItems] = useState([])
    const [allListItems, setAllListItems] = useState([])
    const [categories, setCategories] = useState([])
    const [filteredByCategory, setFilteredByCategory] = useState(0)
    const [filteredByPriority, setFilteredByPriority] = useState(false)
    const [stateOfFilter, setStateOfFilter] = useState({})
    // const [filterUpdated, setFilterUpdated] = useState(false)
    const localUser = localStorage.getItem('pantryUserId')
    const [list, updateList] = useState({})
    //     id: 0,
    //     user: 0,
    //     name: "",
    //     notes: "",
    //     date_created: "",
    //     completed: false,
    //     date_completed: null
    // })

    const { renderSwitch, setRenderSwitch, setListId, setItemId, setCategoryId } = useContext(ListContext)


    useEffect(
        () => {
            getListById(listId)
                .then((data) => {
                    updateList(data)
                })
        },
        [listId, renderSwitch]
    )

    useEffect(
        () => {
            getItemsByList(listId)
                .then((listItemArray) => {
                    setAllListItems(listItemArray)
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






    // useEffect(
    //     () => {
    //         stateOfFilter.selectedCategory = parseInt(filteredByCategory)
    //         setFilterUpdated(!filterUpdated)

    //     },
    //     [filteredByCategory]
    // )

    // useEffect(
    //     () => {
    //         stateOfFilter.priorityOnly = filteredByPriority
    //         setFilterUpdated(!filterUpdated)

    //     },
    //     [filteredByPriority]
    // )


    // useEffect(
    //     () => {
    //         if (allListItems) {
    //             let filteredItems = allListItems
    //             if (stateOfFilter.selectedCategory) {
    //                 filteredItems = filteredItems.filter(listItem => listItem?.item?.categoryId === stateOfFilter.selectedCategory)
    //             }
    //             if (filteredByPriority === true) {
    //                 let priorityItems = []
    //                 {
    //                     allListItems.map(li => {
    //                         if (li?.priority === true) {
    //                             priorityItems.push(li)
    //                         }
    //                     })
    //                 }
    //                 console.log(priorityItems)

    //                 let priorityArr = []
    //                 priorityItems.map(itemP => {
    //                     let starred = filteredItems.find(itemF => itemF?.id === itemP?.id)
    //                     if (starred) {
    //                         priorityArr.push(starred)
    //                     }

    //                 })
    //                 filteredItems = priorityArr
    //             }
    //             setListItems(filteredItems)
    //         }
    //     },
    //     [filterUpdated, allListItems]
    // )


    useEffect(
        () => {

            if (filteredByCategory !== 0 || filteredByPriority !== false || listId !== 0)  {
                getItemsByHttpString(queryStrings(listId, parseInt(filteredByCategory), filteredByPriority))
                    .then((data) => { setListItems(data) })
            }
           
            // else {
            //     getItemsByList(listId)
            //         .then((listItemArray) => {
            //             setListItems(listItemArray)
            //             })
            // }

        }, [listId, filteredByCategory, filteredByPriority, stateOfFilter]
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
        console.log(newString)
        return newString
    }











    const addItemButton = () => {
        if (!list.completed) {
            // if (listItems.length === 0) {
            //     return <>
            //         <button onClick={() => {
            //             setListId(list.id)
            //             navigate("/listItem/create")
            //         }
            //         }>Add Items</button>
            //     </>
            // } else {
                return <>
                    <button onClick={() => {
                        setListId(list.id)
                        navigate("/listItems")
                    }
                    }>Add Items</button>
                </>
            // }

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





    // var dateObj = new Date();
    // var month = dateObj.getUTCMonth() + 1; //months from 1-12
    // var day = dateObj.getUTCDate();
    // var year = dateObj.getUTCFullYear();

    // const newDate = year + "-" + month + "-" + day

    var dateObj = new Date();
var month = ('0' + (dateObj.getUTCMonth() + 1)).slice(-2); // add leading zero and slice last 2 digits
var day = ('0' + dateObj.getUTCDate()).slice(-2); // add leading zero and slice last 2 digits
var year = dateObj.getUTCFullYear();

const newDate = year + "-" + month + "-" + day;



    const markCompleteButton = () => {
        if (!list.completed) {
            return <button
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
                    console.log(copy)
                    editList(copy)
                        // .then(response => response.json())
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
                            // .then(response => response.json())
                            .then(() => {
                                setRenderSwitch(!renderSwitch)
                            })
                    }}>Completed on {list.date_completed}</button>
            </>
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

        <section className="listDetail">
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
                        <input type="checkbox" onClick={() => setFilteredByPriority(!filteredByPriority)} />
                    </div>
                </div>

                <section>
                    <ul className="unorderedListElement">
                        {
                            listItems.map(listItem => {
                                const matchedCategory = categories.find(category => category?.id === listItem?.item?.category)
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

                                                    <section>
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
                            fetch(`http://localhost:8088/lists/${list?.id}`, {
                                method: "DELETE"
                            })
                                .then(() => {
                                    navigate("/lists")
                                })

                        }>Delete List</button>
                    </div>
                </footer>
            </div>
        </section>
    </>
}


