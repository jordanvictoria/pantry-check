import { getAllLists, SendNewList } from "../ApiManager";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const ListForm = () => {
    const localPantryUser = localStorage.getItem("pantry_user")
    const pantryUserObj = JSON.parse(localPantryUser)
    const [newList, updateNewList] = useState({
        name: "",
        notes: ""
    })
    const [lastList, setLastList] = useState({})
    const navigate = useNavigate()

    useEffect(
        () => {
            getAllLists()
                .then((listArr) => {
                    const listObj = listArr.slice(-1)
                    setLastList(listObj)
                })
        },
        []
    )

    
    
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    
    const newDate = month + "/" + day + "/" + year
    
    
    
    
    const listToSendToAPI = {
        userId: pantryUserObj.id,
        name: newList.name,
        notes: newList.notes,
        dateCreated: newDate,
        completed: false
    }
    
    const navigateToNewList = () => {
        const indexOfNewObj = parseInt(lastList[0].id + 1)
        navigate(`/lists/${indexOfNewObj}`)
    }
    
    
    


    return <>
        <form>
            <fieldset>
                <div>Name:
                    <input type="text" id="name" onChange={
                        (evt) => {
                            const copy = { ...newList }
                            copy.name = evt.target.value
                            updateNewList(copy)
                        }
                    } />
                </div>
                <div>Notes:
                    <input id="story" onChange={
                        (evt) => {
                            const copy = { ...newList }
                            copy.notes = evt.target.value
                            updateNewList(copy)
                        }
                    } />
                </div>

                <button onClick={() => {
                    if (newList.name) {
                        SendNewList(listToSendToAPI)
                        navigateToNewList()
                        // navigate(`/lists/${indexOfNewObj}`)
                    }
                }}>Save</button>

            </fieldset>
        </form>
    </>

}