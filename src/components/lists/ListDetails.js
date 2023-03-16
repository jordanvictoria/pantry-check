import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ReactComponent as YellowStar } from "../images/favorite-star-yellow.svg"
import { ReactComponent as BlankStar } from "../images/favorite-star-blank.svg"
import { getAllCategories, getAllListItems } from "../ApiManager"
import "./list.css"
import { ListContext } from "../context/ListProvider"


export const ListDetails = () => {
    const { listId } = useParams()
    const [list, updateList] = useState({})
    const [listItems, setListItems] = useState([])
    const [matchListItems, setMatchListItems] = useState([])
    const [categories, setCategories] = useState([])
    const { renderSwitch, setRenderSwitch, setListId } = useContext(ListContext)
    const navigate = useNavigate()


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
            getAllListItems()
                .then((array) => {
                    setMatchListItems(array)
                })
        },
        []
    )









    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    const newDate = month + "/" + day + "/" + year






    const addItemButton = () => {
        if (!list.completed) {
            return <>
                <button onClick={() => {
                    setListId(list.id)
                    navigate("/item/create")
                }
                }>Add Items</button>
                --
            </>

        } else {
            return ""
        }
    }


    const editItemButton = (id) => {
        if (!list.completed) {
            return <Link to={`/items/${id}/edit`}>
                <button>Edit</button>
            </Link>
        } else {
            return ""
        }
    }


    const removeItemButton = (obj) => {
        // const foundListItem = matchListItems.find(item => id === item.id)
        // console.log(foundListItem)
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
            return <Link to={`lists/${list.id}/edit`}>
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
                {addItemButton()}  <button>Filter by Category</button>
                <button>Show Priority Only</button>
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
                                            removeItemButton(listItem)
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