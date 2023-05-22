import React, { useState, createContext } from "react";


export const ListContext = createContext()

export const ListProvider = (props) => {
    const [listId, setListId] = useState(0)
    const [itemId, setItemId] = useState(0)
    const [categoryId, setCategoryId] = useState(0)
    const [renderSwitch, setRenderSwitch] = useState(false)
 

   

    

    return (
        <ListContext.Provider value={{
            listId, setListId, 
            renderSwitch, setRenderSwitch, 
            itemId, setItemId, 
            categoryId, setCategoryId
        }}>
            {props.children}
        </ListContext.Provider>
    )
}