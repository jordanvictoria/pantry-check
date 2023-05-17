import { getAllLists } from "../ApiManager";
import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./listForm.css"
import { ListContext } from "../context/ListProvider"



export const ListForm = () => {
    const localPantryUser = localStorage.getItem("pantry_user")
    const pantryUserObj = JSON.parse(localPantryUser)
    const { renderSwitch, setRenderSwitch } = useContext(ListContext)
    const [lists, setLists] = useState([])
    const [newList, updateNewList] = useState({
        name: "",
        notes: ""
    })
    const [lastList, setLastList] = useState({})
    const navigate = useNavigate()

    

    // useEffect(
    //     () => {
    //         getAllLists()
    //             .then((listArr) => {
    //                 if (listArr.length === 1) {
    //                     const listObj = listArr[0]
    //                     setLastList(listObj)
    //                 } else {
    //                     const lastlistObj = listArr.slice(-1)
    //                     setLastList(lastlistObj)
    //                 }
                    
    //             })
    //     },
    //     [renderSwitch]
    // )

    useEffect(
        () => {
            getAllLists()
                .then((listArr) => {
                    setLists(listArr)
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

    const newDate = year + "-" + month + "-" + day






    const listToSendToAPI = {
        userId: pantryUserObj.id,
        name: newList.name,
        notes: newList.notes,
        dateCreated: newDate,
        completed: false
    }






    // const navigateToNewList = () => {
    //     const indexOfNewObj = parseInt(lastList[0].id + 1)
    //         navigate(`/lists/${indexOfNewObj}`)
    // }

    const navigateToNewList = () => {
        if (lists.length >= 1) {
            const indexOfNewObj = parseInt(lastList[0].id + 1)
            navigate(`/lists/${indexOfNewObj}`)
        } else {
            navigate(`/lists/3`)
        }
    }





    const SendNewList = (newListForAPI) => {

        return fetch(`http://localhost:8088/lists`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newListForAPI)
        })
            .then(res => res.json())
            // .then(() => {
            //     setRenderSwitch(!renderSwitch)
            // })
            // .then(() => {
            //     navigateToNewList()
            // })


    }








return <>
    <section className="listForm">
        <form className="relativeForm">
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
                    <input className="formNotes" onChange={
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
                        // setRenderSwitch(!renderSwitch)
                    }
                }}>Save</button>
                <button className="cancelList" onClick={() => { navigate(`/lists`) }}>Cancel</button>
            </fieldset>
        </form>
    </section>
</>

}