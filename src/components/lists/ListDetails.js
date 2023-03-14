import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ReactComponent as YellowStar } from "../images/favorite-star-yellow.svg"
import { ReactComponent as BlankStar } from "../images/favorite-star-blank.svg"
import { getAllCategories } from "../ApiManager"


export const ListDetails = () => {
    const {listId} = useParams([])
    const [list, updateList] = useState({})
    const [listItems, setListItems] = useState({})
    const [categories, setCategories] = useState({})
    const [renderSwitch, setRenderSwitch] = useState(false)

    useEffect(
        () => {
            fetch(`http://localhost:8088/lists/${listId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleList = data[0]
                    updateList(singleList)
                })
        },
        [listId]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/listItems?_expand=item&listId=${listId}`)
                .then(response => response.json())
                .then((listItemArray) => {
                    setListItems(listItemArray)
                })
        },
        [listId]
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
                        dateCompleted: new Date()
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
            return <Link to={`lists/${list.id}/edit`}>Edit List</Link>
        } else {
            return ""
        }
    }




    return <>

    <article>
        <header>{list?.name}</header>
        <div>
            <button>Add Items</button>
            <button>Filter by Category</button>
            <button>Show Priority Only</button>
        </div>
        {/* <section>
            <ul>
                {
                    listItems.map(listItem => {
                        const matchedCategory = categories.find(category => category?.id === listItem?.item?.categoryId)
                        return (
                            <li>
                                <section>
                                    <header>{listItem?.item?.name}</header>
                                    <div>{listItem?.priority ? <YellowStar></YellowStar> : <BlankStar></BlankStar>}</div>
                                    <div>Quantity: {listItem?.quantity}</div>
                                    <div>Price: {listItem?.quantity} * {listItem?.item?.price}</div>
                                </section>
                                <section>
                                    <div>Category: {matchedCategory?.name}</div>
                                    <button>Edit</button>
                                    <button>Remove</button>
                                </section>
                            </li>
                        )
                    })
                }
            </ul>
        </section> */}
        <section>
            <div>Estimated Total: </div>
            <div>Notes: {list?.notes}</div>
        </section>
        <footer>
            {/* {
                markCompleteButton()
            }
            {
                editListButton()
            } */}
            <button>Delete List</button>
        </footer>

    </article>
    </>
}