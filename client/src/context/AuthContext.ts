import {createContext} from 'react'
import {Roles} from "../roles";

function noop(){

}
export const AuthContext = createContext({
    id: -1,
    name:"",
    role: Roles.USER,
    isAuthenticated: false,
    login: noop,
    logout:  noop,
    // isAuthenticated: false
})

