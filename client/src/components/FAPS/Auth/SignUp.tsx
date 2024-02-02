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
                <input
                    className={"my-3 col s12"}
                    type="text"
                    name="name"
                    placeholder="Введите имя"
                    onChange={changeHandler}
                />
                <input
                    className={"my-3 col s12"}
                    type="email"
                    name="email"
                    placeholder="Введите email"
                    onChange={changeHandler}
                />
                <input
                    className={"my-3 col s12"}
                    type="password"
                    name="password"
                    placeholder="Введите пароль"
                    onChange={changeHandler}
                />
                <input
                    className={"my-3 col s12"}
                    type="password"
                    name="repeatPassword"
                    placeholder="Повторите пароль"
                    onChange={changeHandler}
                />

                <button
                    className="grey p-3 darken-4 white-text rounded my-4 login col s12"
                    type="submit"
                    onClick={authHandler}
                >
                    Регистрация
                </button>

            </form>
        </div>
    )
}
