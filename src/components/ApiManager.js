const localPantryUser = localStorage.getItem("pantry_user")
const pantryUserObj = JSON.parse(localPantryUser)

export const getAllLists = () => {
    return fetch(`http://localhost:8088/lists?_expand=user&userId=${pantryUserObj.id}`)
        .then(res => res.json())
}

export const getAllCategories = () => {
    return fetch(`http://localhost:8088/categories`)
        .then(res => res.json())
}



