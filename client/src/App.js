import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import {useRoutes} from "./routes"
import {AuthContext} from "./context/AuthContext"
import './scss/main.scss'
import {getUserByToken} from "./api/auth";

function App() {

    const routes = useRoutes();
    const [user, setUser] = useState()

    useEffect(() => {
        // Simulate fetching user information (replace with your authentication logic)
        fetchUser();
    }, []);

    const fetchUser = async () => {
        // Fetch user information from your API or any authentication source
        const fetchedUser = await getUserByToken().catch((err) => console.log(err))
        setUser(fetchedUser);
    };

    const logout = () => {
        // Clear user-related information from local storage
        localStorage.removeItem('authToken');
        // Set user context to null or an empty object
        setUser(null);
    };

    const login = () => {
        fetchUser();
    };

    return (
        <AuthContext.Provider value={{
            userId: user?.id, role: user?.role_name, logout:logout, login:login
        }}>
           {/*user {user?.id}*/}
            <Router>
                {routes}
            </Router>
        </AuthContext.Provider>
    )
}

export default App
