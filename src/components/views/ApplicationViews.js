import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { ItemForm } from "../items/ItemForm"
import { GroceryLists } from "../lists/GroceryLists"
import { ListDetails } from "../lists/ListDetails"
import { ListEdit } from "../lists/ListEdit"
import { ListForm } from "../lists/ListForm"


export const ApplicationViews = () => {

const navigate = useNavigate()

	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1 className="title--main">
						<Link to="/">Pantry Check</Link>
					</h1>
					<h2>Stay on top, plan before you shop!</h2>
					<div>
						<button onClick={() => navigate("/list/create")}>Create a New List</button>
					</div>
					<div>--------------------------------------------------------------------</div>

					<Outlet />
				</>
			}>

				<Route path="lists" element={<GroceryLists />} />
				<Route path="lists/:listId" element={ <ListDetails /> } />
				<Route path="list/create" element={<ListForm />} />
				<Route path="lists/:listId/edit" element={<ListEdit />} />
				<Route path="item/create" element={<ItemForm />} />
			</Route>
		</Routes>
	)
}