import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { ListProvider } from "./context/ListProvider"
import { useState } from "react"


export const PantryCheck = () => {
	const [token, setTokenState] = useState(localStorage.getItem('pantry_token'))
	const [userId, setUserId] = useState(localStorage.getItem('pantryUserId'))

	const setToken = (newToken, user_id) => {
	  localStorage.setItem('pantry_token', newToken)
	  localStorage.setItem('pantryUserId', user_id)
	  setTokenState(newToken)
	  setUserId(user_id)
	}

	return <Routes>
		<Route path="/login" element={<Login setToken={setToken} />} />
		<Route path="/register" element={<Register setToken={setToken} />} />

		<Route path="*" element={
			<Authorized token={token}>
				<>
					<ListProvider>
						<NavBar setToken={setToken}/>
						<ApplicationViews />
					</ListProvider>
				</>
			</Authorized>

		} />
	</Routes>
}



