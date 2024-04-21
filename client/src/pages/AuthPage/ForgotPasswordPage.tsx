import React, {useState} from 'react';
import {forgotPassword} from "api/auth";
import {showToast} from "functions/toast";
import {ProgressBar} from "react-materialize";

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        await forgotPassword(email).then((res) => {
            showToast(res.message, "save")
            setIsLoading(true)
        }).catch((err) => {
            showToast(err?.response?.data || 'An error occurred during sending', "error")
        }).finally(() => {
            setIsLoading(false)
        })
    };

    return (
        <div className={"auth"}>
            <div className={"form-wrap"}>
                <form onSubmit={handleSubmit}>
                    {isLoading ? <ProgressBar/> : null}
                    <div className={'row'} style={{minWidth:"250px"}}>
                        <div className="input-field col s12">
                            <input
                                id={"email"}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="email">Введите e-mail:</label>
                        </div>
                    </div>
                    <button type="submit"
                            className="grey p-3 darken-4 white-text rounded mb-2 login button col s12">
                        Сбросить пароль
                    </button>
                </form>
            </div>
        </div>

    );
}
