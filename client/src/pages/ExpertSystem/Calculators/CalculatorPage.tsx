import React, {useState} from 'react'
import './Calculators.scss'
import {CalculatorLocalitiesPage} from "./CalculatorLocalities";
import {CalculatorMCSPage} from "./CalculatorMCS";

export const CalculatorPage = () => {

    const [selectedTab, setSelectedTab] = useState(0)
    const tabs = ['НП-ы', 'МП-ы']
    const onTabClick = (index: number) => {
        setSelectedTab(index)
    }

    const tabPage = () => {
        switch (selectedTab) {
            case 0:
                return (<CalculatorLocalitiesPage/>)
            case 1:
                return (<CalculatorMCSPage/>)
        }
    }

    return (
        <div className="calculator-page">
            <div className="container">
                <div className={'view'} style={{overflow:'hidden'}}>
                    <div className={'tabs-wrapper'}>
                        {tabs.map((tab, index) => {
                            return (<div className={`custom-tab ${selectedTab == index ? 'selected' : ''}`} key={index}
                                         onClick={() => onTabClick(index)}>{tab}</div>)
                        })}
                    </div>
                    <div className={'content-wrapper'}>
                        {tabPage()}
                    </div>
                </div>
            </div>
        </div>
    )
}


