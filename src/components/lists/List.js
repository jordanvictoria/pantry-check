import { Link } from "react-router-dom"
import "./list.css"

export const List = ({ listObj }) => {
  

    return (

     <section className="groceryList">
        
        <header className="title">
            <Link to={`/lists/${listObj.id}`}>{listObj.name}</Link>
        </header>
        <div className="description">
            {
                listObj.completed
                    ? `Completed on ${listObj.date_completed}`
                    : `Created on ${listObj.date_created}`
            }
        </div>
    </section>
    )

}
