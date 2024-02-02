import React, {useState} from 'react'
import {login} from "../../api/auth";
import {ProgressBar, Tab, Tabs} from "react-materialize";
import "./AuthPage.scss"
import {Redirect} from "react-router-dom";
import {toast} from "../../components/Elements/Toast/ToastManager";
import {Login} from "../../components/FAPS/Auth/Login";

export const AuthPage = () => {
    const tabsNames = ["Вход", "Регистрация"]

    const [isLoading, setIsLoading] = useState(false)

    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [tab, setTab] = useState(0);

    const showToast = (msg: string) => {
        toast.show({
            content: msg,
            type: "error"
        });
    }

    const handleOnSendLogin = async (form: { nameEmail: string, password: string }) => {
        setIsLoading(true)
        await login({...form}).then((res) => {
            setShouldRedirect(true)
            localStorage.setItem('authToken', res?.token);
        }).catch((err) => {
            showToast(err?.response?.data || 'An error occurred during login.')
        }).finally(() => {
            setIsLoading(false)
        })

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
                {/*login*/}
                {tab === 0 ?  <Login onSend={handleOnSendLogin}/> : null}

                {/*    sighn up*/}

            </div>

        </div>
    )
}
