import { Link } from "react-router-dom"
import "./list.css"

export const List = ({ listObj }) => {
  


    return <section>
        <header>
            <Link to={`/lists/${listObj.id}`}>{listObj.name}</Link>
        </header>
        <div>
            {
                listObj.completed
                    ? `Completed on ${listObj.dateCompleted}`
                    : `Created on ${listObj.dateCreated}`
            }

        </div>

    </section>

}
