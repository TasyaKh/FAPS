import React, {useContext, useState} from 'react'
import {login, signUp} from "api/auth";
import {ProgressBar} from "react-materialize";
import "./AuthPage.scss"
import {Redirect} from "react-router-dom";
import {Login} from "components/FAPS/Auth/Login";
import {SignUp} from "components/FAPS/Auth/SignUp";
import {AuthContext} from "context/AuthContext";
import {showToast} from "functions/toast";

export const AuthPage = () => {
    const {login:loginContext} = useContext(AuthContext)

    const tabsNames = ["Вход", "Регистрация"]

    const [isLoading, setIsLoading] = useState(false)

    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [tab, setTab] = useState(0);

    const handleOnSendLogin = async (form: { nameEmail: string, password: string }) => {
        setIsLoading(true)
        await login({...form}).then((res) => {
            setShouldRedirect(true)
            localStorage.setItem('authToken', res?.token);
            loginContext()
        }).catch((err) => {
            showToast(err?.response?.data || 'An error occurred during login.', "error")
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const handleOnSendReg = async (form: { name: string, password: string, repeatPassword: string, email:string }) => {

        if (form.password === form.repeatPassword) {
            setIsLoading(true)
            await signUp({password: form.password, name: form.name, email:form.email}).then((res) => {
                showToast('Создано', "save")
            }).catch((err) => {
                showToast(err?.response?.data || 'An error occurred during login.', "error")
            }).finally(() => {
                setIsLoading(false)
            })
        } else {
            showToast("Пароли не совпадают", "error")
        }
    }
    return (
        <div className={"auth"}>
            {shouldRedirect && <Redirect to="/expert-system"/>}

            <h2>Авторизуйтесь</h2>
            {isLoading ? <ProgressBar/> : null}

            <div className={"form-wrap"}>
                <div className={"tabs row"}>
                    {tabsNames.map((value, i) => (
                        <a className={`tab col s6 ${tab === i ? "selected" : ''}`} onClick={() => setTab(i)}>{value}</a>
                    ))}
                </div>
                {/*login/SignUp*/}
                {tab === 0 ? <Login onSend={handleOnSendLogin}/> : <SignUp onSend={handleOnSendReg}/>}
            </div>
        </div>
    )
}
