import {Button, Icon} from "react-materialize";
import React, {FC, useContext} from 'react'
import './AuthBtn.scss'
import {Link} from "react-router-dom";
import {AuthContext} from "../../../../context/AuthContext";

interface AuthBtnProps {
}

export const AuthBtn: FC<AuthBtnProps> = () => {

    const {logout, isAuthenticated, role,name} = useContext(AuthContext)

    const onLogout = async () => {
        logout()
    }

    return (
        <>
            {!isAuthenticated ?
                <Link to="/auth" className="auth-btn">
                    <Button
                        className="grey darken-4 "
                        node="button"
                        waves="light"
                    >
                        Войти
                    </Button>
                </Link> :
                <Button
                    className="red darken-4 "
                    node="button"
                    waves="light"
                    onClick={onLogout}
                >
                    {name}, Выйти <Icon className={"material-icons"}>exit_to_app</Icon>
                </Button>
            }
        </>
    )
}
