import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import {useRoutes} from "./routes"
import {AuthContext} from "./context/AuthContext"
import './scss/main.scss'
import {getUserLocal} from "./api/auth";

function App() {

    const routes = useRoutes();
    const [user, setUser] = useState({role: "", name: "", isAuthenticated: false, id: -1})

    useEffect(() => {
        // Simulate fetching user information (replace with your authentication logic)
     fetchUser()
    }, []);

    const fetchUser = ()=>{
        const usr = getUserLocal()
        setUser(usr)
    }
    const logout = () => {
        // Clear user-related information from local storage
        localStorage.removeItem('authToken');
        fetchUser()
    };

    const login = () => {
        fetchUser();
    };

    return (
        <AuthContext.Provider value={{
            ...user, logout: logout, login: login
        }}>
            {/*user {user?.id}*/}
            <Router>
                {routes}
            </Router>
        </AuthContext.Provider>
    )
}

export default App
