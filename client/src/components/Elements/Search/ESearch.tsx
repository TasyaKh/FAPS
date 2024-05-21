import React, {FC, ReactNode, useState} from 'react'
import {TextInput} from "react-materialize";
import './ESearch.scss'

interface ESearchProps {
    handleInput?: (txt: string) => void
    handleOnSearch?:(txt: string) => void
    placeholder?: string
    childButton?: ReactNode //maybe we need add some button
}

export const ESearch: FC<ESearchProps> = ({
                                              handleInput,
                                              handleOnSearch,
                                              placeholder = 'Поиск',
                                              childButton
                                          }) => {

    const [searchTxt, setSearchTxt] = useState("")

    const handleInputT = (e: any) => {
        const txt:string =  e.target.value.trim().toLowerCase()
        setSearchTxt(txt)
        if (handleInput) {
            handleInput(txt)
        }
    }

    const handleOnSearchT = (e: any) => {
        if (handleOnSearch) {
            handleOnSearch(searchTxt)
        }
    }

    return (
        <div className="e-sidebar">
            <div className="e-sidebar__search">

                <TextInput
                    id="e-sidebar-input"
                    inputClassName="e-sidebar__text-input"
                    placeholder={placeholder}
                    onChange={handleInputT}
                />

            </div>

            <div className="e-sidebar__controls">

                <button
                    className="e-sidebar__button e-sidebar__button--search"
                    onClick={handleOnSearchT}
                >
                    <img src='/img/magnifier.svg' alt="Поиск"/>
                </button>

                {childButton}
            </div>
        </div>
    )
}
