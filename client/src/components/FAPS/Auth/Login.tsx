import React, {FC, useState} from 'react'
import "pages/AuthPage/AuthPage.scss"
import {Link} from "react-router-dom";

interface Props {
    onSend: (form: { nameEmail: string, password: string }) => void
}

export const Login: FC<Props> = ({onSend}) => {

    const [form, setForm] = useState({
        nameEmail: '',
        password: ''
    })

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const authHandler = async (event: any) => {
        event.preventDefault()
        onSend(form)
    }

    return (
        <div className={""}>
            {/*login*/}
            <form>
                <div className={'row'}>
                    <div className="input-field col s12">
                        <input
                            id="nameEmail"
                            className={"my-3 validate"}
                            type="text"
                            name="nameEmail"
                            onChange={changeHandler}
                        />
                        <label htmlFor="nameEmail">Имя или email</label>
                    </div>

                    <div className="input-field col s12">
                        <input
                            id="password"
                            className={"my-3 validate"}
                            type="password"
                            name="password"
                            onChange={changeHandler}
                        />
                        <label htmlFor="password">Пароль</label>
                    </div>
                    <button
                        className="grey p-3 darken-4 white-text rounded my-4 login button col s12"
                        type="submit"
                        onClick={authHandler}
                    >
                        Войти
                    </button>
                    <Link to={"/auth/forgot-password"}>
                        <div className={"link"}>Забыли пароль?</div>
                    </Link>

                </div>

            </form>
        </div>
    )
}
