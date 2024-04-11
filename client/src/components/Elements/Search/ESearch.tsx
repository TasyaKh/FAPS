import React, {FC, ReactNode} from 'react'
import {TextInput} from "react-materialize";
import './ESearch.scss'

interface ESearchProps {
    handleInput?: (e: any) => void
    handleOnSearch?:(e: any) => void
    placeholder?: string
    childButton?: ReactNode //maybe we need add some button
}

export const ESearch: FC<ESearchProps> = ({
                                              handleInput,
                                              handleOnSearch,
                                              placeholder = 'Поиск',
                                              childButton
                                          }) => {

    return (
        <>
            <div className="sidebar__search">

                <TextInput
                    id="sidebar-input"
                    inputClassName="sidebar__text-input"
                    placeholder={placeholder}
                    onChange={handleInput}
                />

            </div>

            <div className="sidebar__controls">

                <button
                    className="sidebar__button sidebar__button--search"
                    onClick={handleOnSearch}
                >
                    <img src='/img/magnifier.svg' alt="Поиск"/>
                </button>

                {childButton}
            </div>
        </>
    )
}
