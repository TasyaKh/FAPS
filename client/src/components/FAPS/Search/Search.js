import React from 'react'
import '../ListView/ListView.scss'
import {CardPanel, TextInput} from "react-materialize";
import {SearchFilter} from "./SearchFilter"
import './Search.scss'

export const Search = (props) => {

  return (
    <CardPanel className={ props.scroll ? "sidebar__header" : "sidebar__header sidebar__header--fixed"}>

      <div className="sidebar__search">

        <TextInput
          id="sidebar-input"
          inputClassName="sidebar__text-input"
          placeholder="Поиск"
          xl
          onChange={props.handleInput}
        />

      </div>

      <div className="sidebar__controls">

        <button
          className="sidebar__button sidebar__button--search"
        >
          <img src='/img/magnifier.svg' alt="Поиск"/>
        </button>

        <button
          className="sidebar__button sidebar__button--filter"
          onClick={props.handleFilter}
        >
            <img src='/img/filter.svg'/>
        </button>
      </div>

      <SearchFilter
        updateData={props.updateData}
        visible={props.filterShow}
      />

    </CardPanel>
  )
}
