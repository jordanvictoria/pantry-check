import { useNavigate } from "react-router-dom"

export const Home = () => {
const navigate = useNavigate()

    return <>
    <div>
        <button onClick={() => navigate("/list/create")}>Create a New List</button>
    </div>
    </>
}