import React, {FC} from "react"
import "./ELegendHetmap.scss"

interface ELegendProps {

}

const HeatmapBlock = (props:{text:string})=> {
    return (
        <div className={'block'}>
            <div className={'info-block colored-block '}></div>
            <span className={'info-block'}> {props.text} </span>
        </div>
    )
}

export const ELegendHetmap:
    FC<ELegendProps> = ({}) => {

    return (
        <div className="legend-heatmap">
            <HeatmapBlock text={'< 100'}/>
            <HeatmapBlock text={'300'}/>
            <HeatmapBlock text={'2k'}/>
            <HeatmapBlock text={'5k'}/>
            <HeatmapBlock text={'10k'}/>
            <HeatmapBlock text={'20k'}/>
            <HeatmapBlock text={'40k'}/>
            <HeatmapBlock text={'80k'}/>
            <HeatmapBlock text={'100k'}/>
            <HeatmapBlock text={'> 100k'}/>
        </div>
    )
}
