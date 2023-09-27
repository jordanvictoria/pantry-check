import { addList } from "./ListManager"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import "./listForm.css"




export const ListForm = () => {
    const [newList, updateNewList] = useState({
        name: "",
        notes: ""
    })
    const [newListId, setNewListId] = useState(0)
    const navigate = useNavigate()



    useEffect(() => {
        if (newListId) {
            navigate(`/lists/${newListId}`);
        }
    }, [newListId, navigate]);


    var dateObj = new Date();
    var month = ('0' + (dateObj.getUTCMonth() + 1)).slice(-2);
    var day = ('0' + dateObj.getUTCDate()).slice(-2);
    var year = dateObj.getUTCFullYear();
    const newDate = year + "-" + month + "-" + day;



    const SendNewList = (event) => {
        event.preventDefault()

        const newListForAPI = {
            name: newList.name,
            notes: newList.notes,
            date_created: newDate,
            completed: false,
            date_completed: null
        }

        addList(newListForAPI)
            .then(res => res.json())
            .then(createdItem => {
                const createdListId = parseInt(createdItem.id)
                setNewListId(createdListId)
            })
    }









    return <div className="site-background">
        <section className="listFormContainer">
            <form className="relativeListForm">
                <fieldset>
                    <div className="formDivs">
                        <label>Name:</label>
                        <input type="text" id="name" onChange={
                            (evt) => {
                                const copy = { ...newList }
                                copy.name = evt.target.value
                                updateNewList(copy)
                            }
                        } />
                    </div>
                    <div className="formDivs">
                    <label>Notes:</label>
                        <input className="formNotes" onChange={
                            (evt) => {
                                const copy = { ...newList }
                                copy.notes = evt.target.value
                                updateNewList(copy)
                            }
                        } />
                    </div>

                    <button onClick={(clickEvent) => {
                        if (newList.name) {
                            SendNewList(clickEvent)
                        }
                    }}>Save</button>
                    <button className="cancelList" onClick={() => { navigate(`/lists`) }}>Cancel</button>
                </fieldset>
            </form>
        </section>
    </div>

}