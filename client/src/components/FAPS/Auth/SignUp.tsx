import React, {FC, useState} from 'react'
import "pages/AuthPage/AuthPage.scss"
interface Props {
    onSend: (form: { name: string, password: string,repeatPassword:string, email:string }) => void
}

export const SignUp: FC<Props> = ({onSend}) => {

    const [form, setForm] = useState({
        name: '',
        email:'',
        password: '',
        repeatPassword:''
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
            {/*sign-up*/}

            <form className={"row mb-0"}>
                <div className="input-field col s12">
                    <input
                        className={""}
                        type="text"
                        name="name"

                        onChange={changeHandler}
                    />
                    <label htmlFor="name">Имя</label>
                </div>
                <div className="input-field col s12">
                    <input
                        className={""}
                        type="email"
                        name="email"
                        onChange={changeHandler}
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-field col s12">
                    <input
                        className={""}
                        type="password"
                        name="password"
                        onChange={changeHandler}
                    />
                    <label htmlFor="password">Пароль</label>
                </div>
                <div className="input-field col s12">
                    <input
                        className={""}
                        type="password"
                        name="repeatPassword"
                        onChange={changeHandler}
                    />
                    <label htmlFor="repeatPassword">Повторите пароль</label>
                </div>

                <button
                    className="grey p-3 darken-4 white-text rounded my-4 login button col s12"
                    type="submit"
                    onClick={authHandler}
                >
                    Регистрация
                </button>

            </form>
        </div>
    )
}
