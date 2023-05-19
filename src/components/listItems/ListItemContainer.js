// import { useContext, useState } from "react"
// import { ListContext } from "../context/ListProvider"
// import { ListItemList } from "./ListItemList"
// import { ListItemSearch } from "./ListItemSearch"

// export const ListItemContainer = () => {
//     const [searchTerms, setSearchTerms] = useState("")
//     const { setCategoryId, renderSwitch, setRenderSwitch, listId } = useContext(ListContext)
//     return <>
//         <ListItemSearch setterFunction={setSearchTerms} />
//         <ListItemList searchTermState={searchTerms} />
//     </>
// }