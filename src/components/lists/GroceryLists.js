import { useEffect, useState } from "react"
import { useNavigate, useContext } from "react-router-dom"
import { getAllLists } from "../ApiManager"
import { List } from "./List"
import "./list.css"



export const GroceryLists = () => {
    const localPantryUser = localStorage.getItem("pantry_user")
    const pantryUserObj = JSON.parse(localPantryUser)
    const navigate = useNavigate()
    const [lists, setLists] = useState([])
    const [sortedLists, setSortedLists] = useState([])
    const [users, setUsers] = useState([])
    const [matchedUser, setMatchedUser] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/lists?_expand=user&userId=${pantryUserObj.id}`)
                .then(res => res.json())
                .then((listArray) => {
                    setLists(listArray)
                }
                )
        },
        []
    )

    useEffect(
        () => {

            const sortedUserLists = lists.sort((a, b) => a.completed - b.completed)
            setSortedLists(sortedUserLists)
        },
        [lists]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/users`)
                .then(res => res.json())
                .then((usersArr) => {
                    setUsers(usersArr)
                })
        },
        []
    )

    useEffect(
        () => {
            const foundUser = users.find(user => user.id === pantryUserObj.id)
            setMatchedUser(foundUser)
        },
        [users]
    )







    return <section className="groceryList">
        <div className="gList">

            <h1 className="listHeader">{matchedUser?.fullName}'s Lists
            </h1>
            <div>
                <button className="listButton" onClick={() => navigate("/list/create")}>Create a New List</button>
            </div>
            {
                sortedLists.map(list => < List key={`list--${list.id}`}
                    listObj={list} />)
            }
        </div>
    </section>






}