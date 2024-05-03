import {Button, TextInput} from "react-materialize"
import {SearchFilter} from "./Search/SearchFilter"
import React, {useContext, useState} from "react"
import './PageHeader.scss'
import {Link} from "react-router-dom";
import {roleHierarchy, Roles} from "../../roles";
import {AuthContext} from "../../context/AuthContext";


export const PageHeader = (props) => {
    const {role} = useContext(AuthContext)

    const [filtersVisible, setFiltersVisible] = useState(false)

    return (
        <header className={'page-header ' + props.className}>

            <h1 className="page-header__title">
                Медицинские пункты
            </h1>

            <h4 className="page-header__subtitle">
                Подробная информация о мед. пунктанх, инфографика и формирование отчетов
            </h4>

            <div className="page-header__controls">

                <Link
                    to="/"
                    className="page-header__control"
                >
                    <Button
                        node="button"
                        waves="light"
                        className="blue darken-4"
                    >
                        Карта
                    </Button>
                </Link>

                {roleHierarchy[role]?.includes(Roles.EXPERT) &&
                    <Link
                        to="/add"
                        className="page-header__control"
                    >
                        <Button
                            node="button"
                            waves="light"
                            className="blue darken-4"
                        >
                            Добавить мед. пункт
                        </Button>
                    </Link>
                }

                {/*<Button
          node="button"
          waves="light"
          className="page-header__control"
          disabled
        >
          Изменение населения
        </Button>

        <Button
          node="button"
          waves="light"
          className="page-header__control"
          disabled
        >
          Реконструкции
        </Button>*/}

                <Button
                    node="button"
                    waves="light"
                    className="page-header__control"
                    onClick={props.showReports}
                >
                    Отчеты
                </Button>

            </div>

            <div className="search">

                <div className="page-header__search">

                    <TextInput
                        id="view-search__input"
                        inputClassName="view__text-input"
                        label="Поиск мед. пунктов"
                        onChange={props.handleSearch}
                    />

                </div>

                <div className="search__controls">

                    <button
                        className="search__button search__button--search"
                    >
                        <img src='/img/magnifier.svg' alt="Поиск"/>
                    </button>

                    <button
                        className="search__button search__button--filter"
                        onClick={() => setFiltersVisible(!filtersVisible)}
                    >
                        <img src='/img/filter.svg'/>
                    </button>
                </div>

            </div>

            <SearchFilter
                className="page-header__search-filter"
                updateData={props.updateData}
                visible={filtersVisible}
                style="inline"
                source="table"
                api={'/api/view/filter'}
            />

        </header>
    )

}
