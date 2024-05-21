import React, {FC, useState} from 'react'
import './UserChangeRoles.scss'
import {DefaultModal} from "../../../components/ExpertSystem/Modals/TemplateModal";
import {Roles} from "../../../roles";
import {IUser} from "../../../types/types";
import {useMutation, useQuery} from "react-query";
import {findUsers, grantRole} from "../../../api/users";
import {ESearch} from "../../../components/Elements/Search/ESearch";
import {Button, ProgressBar, Select} from "react-materialize";
import {showToast} from "../../../functions/toast";

export const UserChangeRoles = () => {

    const allRoles = Object.values(Roles);
    const handleConditionsModalHide = (show: boolean) => {
        setModalState({show: show})
    }
    const [modalState, setModalState] = useState({
        show: false
    })


    const [filters, setFilters] = useState<IUser>({
        search: ""
    })

    const [grantRoleUser, setGrantRoleUser] = useState<IUser>({})

    const {
        data: users,
        isLoading: findUsersLoading,
        // refetch: refetchFindUsers
    } = useQuery(['findUsers', filters], () => findUsers(filters), {
        enabled: true,
    });

    const {
        mutateAsync,
        isLoading: grantRoleLoading
    } = useMutation("grantRole", (newData: IUser) =>
            grantRole(newData), {
            onSuccess: (res) => {
                setModalState({show: false})
                showToast(res.message, "save")
            },
        }
    );

    const handleInputSearch = (txt: string) => {
        setFilters({...filters, 'search': txt})
    }

    const onManage = (usr: IUser) => {
        setGrantRoleUser(usr)
        handleConditionsModalHide(!modalState.show)
    }

    // user modal
    const User = () => {

        const [selectedRole, setSelectedRole] = useState(Roles.USER);

        const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData: IUser = grantRoleUser;
            formData.role_name = selectedRole
            await mutateAsync(formData).catch((error) => {
                if (error)
                    showToast(error?.toString(), "error")
            })
        };

        const handleRoleChange = (newRole: Roles) => {
            setSelectedRole(newRole);
        };

        return (<div className={"user"}>
            <div className={""} style={{fontWeight: 'bold'}}> Пользователь</div>
            <div> {grantRoleUser.name} </div>
            {/* select role */}
            <div className={""} style={{fontWeight: 'bold'}}>Роль</div>
            <Select
                name={"Роль"}
                onChange={(e) => handleRoleChange(e.target.value as Roles)}
                value={grantRoleUser.role_name}
            >
                {allRoles.map((role, index) => (
                    <option key={index} value={role}>
                        {role}
                    </option>
                ))}
            </Select>

            <form onSubmit={handleFormSubmit}>

                <button className="my-2 btn waves-effect waves-light" type="submit"
                        name="action">Сохранить
                    <i className="material-icons right">check</i>
                </button>
            </form>
            {grantRoleLoading && <ProgressBar/>}
        </div>)
    }


    return (
        <div>
            <div className="management">
                <div className="container white p-3">
                    <ESearch handleOnSearch={handleInputSearch} handleInput={handleInputSearch}/>
                    <div>
                        {users && users[0] && users[0].length > 0 ? (
                            <table>
                                <thead>
                                <tr>
                                    <th>Имя</th>
                                    <th>Роль</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {users[0].map((usr, index) => (
                                    <tr key={index}>
                                        <td>{usr.name}</td>
                                        <td>{usr.role_name}</td>
                                        <td className="flex" style={{justifyContent: "end"}}>
                                            <Button
                                                className="yellow darken-4 "
                                                node="button"
                                                waves="light"
                                                onClick={() => onManage(usr)}
                                            >
                                                Настроить
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>No users found</div>
                        )}
                    </div>

                </div>

            </div>
            <DefaultModal header={"Изменить роль"}
                          child={<User/>}
                          onHide={handleConditionsModalHide}
                          show={modalState.show}/>
        </div>
    )


}
