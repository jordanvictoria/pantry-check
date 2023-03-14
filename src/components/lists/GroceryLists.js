import { useEffect, useState } from "react"
import { getAllLists } from "../ApiManager"
import { List } from "./List"

export const GroceryLists = () => {


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
       
                {
                    sortedLists.map(list => < List key={`list--${list.id}`}
                            listObj={list} />)
                }
       

    </article>


}