import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"




export const ListEdit = () => {
    const { listId } = useParams()
    const navigate = useNavigate()
    const [list, updateList] = useState({
        name: "",
        notes: ""
    })



    useEffect(() => {
        fetch(`http://localhost:8088/lists/${listId}`)
            .then(response => response.json())
            .then((data) => {
                updateList(data)
            })
    }, [listId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/lists/${list.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(list)
        })
            .then(response => response.json())
    }



    return <form>
        <fieldset>
            <div>Name:
                <input required autoFocus type="text" id="name" placeholder={list.name} value={list.name} onChange={
                    (evt) => {
                        const copy = { ...list }
                        copy.name = evt.target.value
                        updateList(copy)
                    }
                } />
            </div>
            <div>Notes:
                <input id="story" placeholder={list.notes} value={list.notes} onChange={
                    (evt) => {
                        const copy = { ...list }
                        copy.notes = evt.target.value
                        updateList(copy)
                    }
                } />
            </div>

            <button onClick={(event) => {
                if (list.name) {
                    handleSaveButtonClick(event)
                    navigate(`/lists/${list.id}`)
                }
            }}>Save</button>

        </fieldset>
    </form>
}