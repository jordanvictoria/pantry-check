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






    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        editList({
            id: listId,
            user: parseInt(localUser),
            name: list.name,
            notes: list.notes,
            date_created: list.date_created,
            completed: false,
            date_completed: null
        })
            .then(() => {
                setRenderSwitch(!renderSwitch)
            })
    }



    return <div className="site-background">
    <section className="listFormContainer">
        <form className="relativeListForm">
                <fieldset>
                    <div className="formDivs">
                        <label>Name:</label>
                        <input required autoFocus type="text" id="name" placeholder={list.name} value={list.name} onChange={
                            (evt) => {
                                const copy = { ...list }
                                copy.name = evt.target.value
                                updateList(copy)
                            }
                        } />
                    </div>
                    <div className="formDivs">
                        <label>Notes:</label>
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
                            handleSaveButtonClick(event)
                            navigate(`/lists/${listId}`)
                        }
                    }}>Save</button>
                    <button className="cancelList" onClick={() => { navigate(`/lists/${list.id}`) }}>Cancel</button>
                </fieldset>
            </form>
        </section>
    </div>
}