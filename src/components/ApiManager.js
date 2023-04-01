import { useNavigate } from "react-router-dom"

const localPantryUser = localStorage.getItem("pantry_user")
const pantryUserObj = JSON.parse(localPantryUser)



export const SendNewList = (newListForAPI) => {
    return fetch(`http://localhost:8088/lists`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newListForAPI)
    })
        .then(res => res.json())

}




export const getAllLists = () => {
    return fetch(`http://localhost:8088/lists?_expand=user&userId=${pantryUserObj.id}`)
        .then(res => res.json())
}

export const getAllCategories = () => {
    return fetch(`http://localhost:8088/categories`)
        .then(res => res.json())
}

export const getAllListItems = () => {
    return fetch(`http://localhost:8088/listItems`)
        .then(res => res.json())
}

export const getAllItems = () => {
    return fetch(`http://localhost:8088/items?userId=${pantryUserObj.id}`)
        .then(res => res.json())
}





