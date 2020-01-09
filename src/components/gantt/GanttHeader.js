import React, {useState, Fragment} from 'react'
import {genDayMonth} from './helpers';
import {genMonthDay} from './helpers';
import {calculateCols} from './helpers';
const GanttHeader = ({start, end}) => {


    const numCols = calculateCols(start, end+1);
    const [grid, ] = useState(()=> {
        const rows = [];
        for (let i=0; i<1; i++) {
            rows.push(Array.from(Array(numCols), () => 0));
        };
        return rows;
    });

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns:`repeat(${numCols}, var(--gantt-size))`,
            }}>
            {grid.map((rows, i) => 
                rows.map((cols, k) => {
                    return (
                    <Fragment  key={`header-${i}-${k}`}>
                    {genDayMonth(k+start) === 2 ? 
                        <h2 className="month-name"
                            style={{
                            gridRowStart:'1',
                            gridColumnStart:`${k}`,
                            }}>{genMonthDay(k+start)}</h2> : ""}
                    <div className="grid-cell-day" 
                        key={`header-${i}-${k}`} style={{
                       
                        gridRowStart:'2'
                    }}>
                    <span className="header-day">
                        {genDayMonth(k+start)}
                    </span>
                    </div>
                    </Fragment>
                ) }))
            }
        </div>
    )
}

export default GanttHeader
