import React, { useState, createContext, useEffect } from "react";


export const ListContext = createContext()

export const ListProvider = (props) => {
    const [listId, setListId] = useState(0)
    // const [msgReadSwitch, setMsgReadSwitch] = useState(false)
    // const [filteredByYear, setFilteredByYear] = useState(0)
    // const [filteredByUser, setFilteredByUser] = useState(0)
    // const [filteredByFavorite, setFilteredByFavorite] = useState(false)
    const [renderSwitch, setRenderSwitch] = useState(false)

   

    

    return (
        <ListContext.Provider value={{
            listId, setListId, renderSwitch, setRenderSwitch
        }}>
            {props.children}
        </ListContext.Provider>
    )
}