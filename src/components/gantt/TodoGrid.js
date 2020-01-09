import React, {useState, useEffect} from 'react'
import produce from 'immer';
import {inInterval, calculateCols} from './helpers';
import {getDays} from './helpers';
import GanttTodo from './GanttTodo';

const TodoGrid = ({timedTodos, start, end}) => {

    const numCols = calculateCols(start, end + 1);
    const numRowsTodos = timedTodos.length;
    const [gridTodos, setGridTodos] = useState(()=> {
        const rows = [];
        for (let i = 0; i< numRowsTodos; i++) {
            rows.push(Array.from(Array(numCols), () => 0));
        };

        return rows;
    });


    const sortedTimedTodos = timedTodos.sort((a,b) => {
        if ((new Date(a.creationDate)) > (new Date(b.creationDate))) {
            return 1;
        }
        if ((new Date(a.creationDate)) < (new Date(b.creationDate))) {
            return -1;
        }
        return 0;
    });

    const intervalsTodos = sortedTimedTodos.map(todo => {
        return [getDays(new Date(todo.createdAt.split("T")[0]))-start, getDays(new Date(todo.deadline.split("T")[0]))-start]
    });


    useEffect(() => {
        setGridTodos((g) => {
            return produce(g, gridCopy => {
                for (let i = 0; i<numRowsTodos; i++) {
                    for (let k = 0; k<numCols; k++) {
                        if (inInterval(k, intervalsTodos[i])) {
                            timedTodos[i].status === 'ACTIVE' ? gridCopy[i][k] = 1 : gridCopy[i][k] = 2;
                        }
                    }
                }
            })
        })
    }, [gridTodos, intervalsTodos, numCols, numRowsTodos, timedTodos]);


    return (
        <div>
            {gridTodos.map((rows, i) => {
                return <div key={`todo-${i}`} style={{
                            display:'grid',
                            gridTemplateColumns: `10rem repeat(${numCols}, var(--gantt-size))`,
                            }}>
                        <div className="row-name">{sortedTimedTodos[i].text}</div>
                        {rows.map((col, k) => (
                            <div className="grid-cell"
                                key={`todo-${i}-${k}`}  
                                style={{width:'var(--gantt-size)', 
                                height:'var(--gantt-size)', 
                                }}>
                                {gridTodos[i][k] ? <GanttTodo gridValue={gridTodos[i][k]} id={sortedTimedTodos[i]._id}/> : ""}
                            </div>
                        ))}
                        </div>
                        }
                )}    
        </div>
    )
}

export default TodoGrid
