import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllLists } from "../ApiManager"
import { List } from "./List"

export const GroceryLists = () => {

    const navigate = useNavigate()
    const [sortedLists, setSortedLists] = useState([])

    useEffect(
        () => {
            getAllLists()
                .then((listArray) => {
                    const sortedUserLists = listArray.sort((a, b) => a.completed - b.completed)
                    setSortedLists(sortedUserLists)
                }
                )
        },
        []
    )

    return <article>
        <div>
            <button onClick={() => navigate("/list/create")}>Create a New List</button>
        </div>

        {
            sortedLists.map(list => < List key={`list--${list.id}`}
                listObj={list} />)
        }


    </article>


}