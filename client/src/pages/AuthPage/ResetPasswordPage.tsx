import React, {useState} from 'react';
import {Redirect, useParams} from "react-router-dom";
import {resetPassword} from "../../api/auth";
import {showToast} from "../../functions/toast";
import {ProgressBar} from "react-materialize";

const UpdatePasswordPage: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const {token} = useParams<{ token: string }>()
    const [isLoading, setIsLoading] = useState(false)
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("token", token)
        if (password !== confirmPassword) {
            setMessage('Passwords do not match. Please try again.');
            return;
        } else {
            await resetPassword({password: password, forgot_password_token: token}).then((res) => {
                showToast(res.message, "save")
                setIsLoading(true)
            }).catch((err) => {
                showToast(err?.response?.data || 'An error occurred during reset.', "error")
            }).finally(() => {
                setIsLoading(false)
            })
        }
        // Reset form fields
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className={"auth"}>
            {shouldRedirect && <Redirect to="/expert-system"/>}
            <h2>Обновить пароль</h2>
            <div className={"form-wrap"}>
                {isLoading ? <ProgressBar/> : null}
                <form onSubmit={handleSubmit}>
                    <div className={'row'}>
                        <div className="input-field col s12">
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="password">Новый пароль:</label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="confirmPassword">Подтвердите пароль:</label>
                        </div>
                        <button type="submit"
                                className="grey p-3 darken-4 white-text rounded my-4 login button col s12">
                            Обновить пароль
                        </button>
                    </div>
                </form>
                <div className={"red-text"}>{message && <p>{message}</p>}</div>
            </div>
        </div>
    );
};

export default UpdatePasswordPage;
