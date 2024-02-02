// import React, {FC, useState} from 'react'
// import "pages/AuthPage/AuthPage.scss"
// interface Props {
//     onSend: (form: { nameEmail: string, password: string }) => void
// }
//
// export const Login: FC<Props> = ({onSend}) => {
//
//     const [form, setForm] = useState({
//         nameEmail: '',
//         password: ''
//     })
//
//     const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setForm({...form, [event.target.name]: event.target.value})
//     }
//
//     const authHandler = async (event: any) => {
//         event.preventDefault()
//         onSend(form)
//     }
//
//     return (
//         <div className={""}>
//             {/*login*/}
//             <form>
//                 <input
//                     className={"my-3"}
//                     type="text"
//                     name="nameEmail"
//                     placeholder="Введите имя или email"
//                     onChange={changeHandler}
//                 />
//
//                 <input
//                     className={"my-3"}
//                     type="password"
//                     name="password"
//                     placeholder="Введите пароль"
//                     onChange={changeHandler}
//                 />
//
//                 <button
//                     className="grey p-3 darken-4 white-text rounded my-4 login"
//                     type="submit"
//                     onClick={authHandler}
//                 >
//                     Войти
//                 </button>
//
//             </form>
//         </div>
//     )
// }
