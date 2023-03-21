import { useState } from "react"
import { ItemList } from "./ItemList"
import { ItemSearch } from "./ItemSearch"

export const ItemContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    return <>
        <ItemSearch setterFunction={setSearchTerms} />
        <ItemList searchTermState={searchTerms} />
    </>
}