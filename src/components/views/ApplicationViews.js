import { Outlet, Route, Routes } from "react-router-dom"
import { ListItemEdit } from "../listItems/ListItemEdit"
import { ListItemForm } from "../listItems/ListItemForm"
import { ItemList } from "../items/ItemList"
import { GroceryLists } from "../lists/GroceryLists"
import { ListDetails } from "../lists/ListDetails"
import { ListEdit } from "../lists/ListEdit"
import { ListForm } from "../lists/ListForm"
import { ItemForm } from "../items/ItemForm"
import { ItemEdit } from "../items/ItemEdit"
import { SelectedItemForm } from "../listItems/SelectedItemForm"
import { Home } from "../home/Home"
import { Locations } from "../locations/Locations"
import { ListItemList } from "../listItems/ListItemList"




export const ApplicationViews = () => {


	return (
		<Routes>
			<Route path="/" element={
				<>
					

					<Outlet />
				</>
			}>
				<Route path="/" element={ <Home /> } /> 
				<Route path="lists" element={<GroceryLists />} />
				<Route path="items" element={<ItemList />} />
				<Route path="locations" element={<Locations />} />
				<Route path="listItems" element={<ListItemList />} />
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