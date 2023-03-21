import React, { useState, createContext, useEffect } from "react";


export const ListContext = createContext()

export const ListProvider = (props) => {
    const [listId, setListId] = useState(0)
    const [itemId, setItemId] = useState(0)
    const [categoryId, setCategoryId] = useState(0)
    const [renderSwitch, setRenderSwitch] = useState(false)
    const [filteredByCategory, setFilteredByCategory] = useState(0)
    const [filteredByFavorite, setFilteredByFavorite] = useState(false)
    // const [msgReadSwitch, setMsgReadSwitch] = useState(false)
    // const [filteredByYear, setFilteredByYear] = useState(0)

   

    

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