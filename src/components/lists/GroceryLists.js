import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { List } from "./List"
import "./list.css"
import { getLists, getUsers } from "./ListManager"



export const GroceryLists = () => {
    const navigate = useNavigate()
    const [lists, setLists] = useState([])
    const [sortedLists, setSortedLists] = useState([])
    const [users, setUsers] = useState([])
    const [matchedUser, setMatchedUser] = useState({})
    const localUser = localStorage.getItem('pantryUserId')
    
   

    useEffect(
        () => {
            getUsers()
                .then((usersArr) => {
                    setUsers(usersArr)
                })
            getLists()
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
            const foundUser = users.find(user => user.user === parseInt(localUser))
            setMatchedUser(foundUser)
        },
        [users, localUser]
    )
      






    return <section className="groceryList">
        <div className="gList">

            <h1 className="listHeader">{matchedUser?.full_name}'s Lists
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