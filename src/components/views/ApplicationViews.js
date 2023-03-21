import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { ListItemEdit } from "../listItems/ListItemEdit"
import { ListItemForm } from "../listItems/ListItemForm"
import { ItemContainer } from "../items/ItemContainer"
import { GroceryLists } from "../lists/GroceryLists"
import { ListDetails } from "../lists/ListDetails"
import { ListEdit } from "../lists/ListEdit"
import { ListForm } from "../lists/ListForm"
import { ItemForm } from "../items/ItemForm"
import { ItemEdit } from "../items/ItemEdit"
import { ListItemContainer } from "../listItems/ListItemContainer"
import { SelectedItemForm } from "../listItems/SelectedItemForm"



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
				<Route path="items" element={<ItemContainer />} />
				<Route path="listItems" element={<ListItemContainer />} />
				<Route path="lists/:listId" element={ <ListDetails /> } />
				<Route path="list/create" element={<ListForm />} />
				<Route path="lists/:listId/edit" element={<ListEdit />} />
				<Route path="listItem/create" element={<ListItemForm />} />
				<Route path="listItems/:listItemId/edit" element={<ListItemEdit />} />
				<Route path="item/create" element={<ItemForm />} />
				<Route path="items/:itemId/edit" element={<ItemEdit />} />
				<Route path="selectedItems/:itemId/edit" element={<SelectedItemForm />} />
			</Route>
		</Routes>
	)
}