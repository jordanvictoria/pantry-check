import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editList, getListById } from "./ListManager"
import { ListContext } from "../context/ListProvider"
import "./listForm.css"

 


export const ListEdit = () => {
    const localUser = localStorage.getItem('pantryUserId')
    const { listId } = useParams()
    const navigate = useNavigate()
    const { renderSwitch, setRenderSwitch } = useContext(ListContext)
    const [list, updateList] = useState({
        id: 0,
        user: 0,
        name: "",
        notes: "",
        date_created: "",
        completed: false,
        date_completed: ""
    })



    useEffect(() => {
        getListById(listId)
            .then((data) => {
                updateList(data)
            })
    }, [listId, renderSwitch])






    const handleSaveButtonClick = () => {

        editList({
        id: listId,
        user: parseInt(localUser),
        name: list.name,
        notes: list.notes,
        date_created: list.date_created,
        completed: false,
        date_completed: null
    })
            // .then(response => response.json())
            .then(() => {
                setRenderSwitch(!renderSwitch)
            })
    }



    return <>
        <section className="listForm">
            <form className="relativeForm">
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
                        <input className="formNotes" placeholder={list.notes} value={list.notes} onChange={
                            (evt) => {
                                const copy = { ...list }
                                copy.notes = evt.target.value
                                updateList(copy)
                            }
                        } />
                    </div>

                    <button onClick={(event) => {
                        if (list.name) {
                            event.preventDefault()
                            handleSaveButtonClick()
                            navigate(`/lists/${listId}`)
                        }
                    }}>Save</button>
                    <button className="cancelList" onClick={() => { navigate(`/lists/${list.id}`) }}>Cancel</button>
                </fieldset>
            </form>
        </section>
    </>
}