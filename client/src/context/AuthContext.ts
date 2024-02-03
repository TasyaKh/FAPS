import {createContext} from 'react'

function noop(){

}
export const AuthContext = createContext({
    id: -1,
    name:"",
    role: "",
    isAuthenticated: false,
    login: noop,
    logout:  noop,
    // isAuthenticated: false
})

