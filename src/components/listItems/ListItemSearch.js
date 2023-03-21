import { useNavigate } from "react-router-dom"

export const ListItemSearch = ({ setterFunction }) => {
    const navigate = useNavigate()

    return (
        <div>
        <input 
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
        
        type="text" placeholder="Enter search term" />
        - Or - 
        <button onClick={() => {
            navigate("/listItem/create")
        }
        }>Create New Item</button>
        </div>
    )
}