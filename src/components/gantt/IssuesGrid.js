import React, {useState, useEffect} from 'react'
import produce from 'immer';
import {inInterval, calculateCols} from './helpers';
import {getDays} from './helpers';
import {fixInterval} from './helpers';
import GanttIssue from './GanttIssue'

const IssuesGrid = ({issues, start, end, projectId}) => {

    const numCols = calculateCols(start, end + 1);
    const numRowsIssues = issues.length;
    const [gridIssues, setGridIssues] = useState(()=> {
        const rows = [];
        for (let i=0; i<numRowsIssues; i++) {
            rows.push(Array.from(Array(numCols), () => 0));
        };
        return rows;
    });

    //Sort the issues by creation date.
    const sortedIssues = issues.sort((a,b) => {
        if ((new Date(a.creationDate)) > (new Date(b.creationDate))) {
            return 1;
        }
        if ((new Date(a.creationDate)) < (new Date(b.creationDate))) {
            return -1;
        }
        return 0;
    });

    // get the intevals of each sorted issue.
    const intervalsIssues = sortedIssues.map(issue => {
        return [fixInterval(getDays(new Date(issue.creationDate.split("T")[0])), start), fixInterval(getDays(new Date(issue.deadline.split("T")[0])), start)];
    });

    // Once it mounts fill the grid where we have a issue
    useEffect(() => {
        setGridIssues((g) => {
            return produce(g, gridCopy => {
                for (let i = 0; i<numRowsIssues; i++) {
                    for (let k = 0; k<numCols; k++) {
                        if (inInterval(k, intervalsIssues[i])) {
                            let status = issues[i].status;
                            let type = issues[i].type;
                            status === 'ON_PROGRESS' ? (type === 'New Feature' ?  gridCopy[i][k] = 'NEW' : type==='Bug' ? gridCopy[i][k]= 'BUG' : gridCopy[i][k] = 'TASK') :  
                            gridCopy[i][k] = 2;
                        }
                    }
                }
            })
        });
    }, [gridIssues, intervalsIssues, issues, numCols, numRowsIssues]);


    return (
        <div>
            {gridIssues.map((rows, i) => {
                return <div key={`issue-${i}`} style={{
                        display:'grid',
                        gridTemplateColumns: `10rem repeat(${numCols}, var(--gantt-size))`,
                        }}>
                        <div className="row-name">{sortedIssues[i].summary}</div>
                        {rows.map((col, k) => (
                            <div key={`issue-${i}-${k}`}  
                                className="grid-cell"
                                style={{
                                    width:'var(--gantt-size)', height:'var(--gantt-size)', 
                                    }}>
                                {gridIssues[i][k] ? 
                                    <GanttIssue gridValue={gridIssues[i][k]} id={sortedIssues[i]._id} projectId={projectId} />
                                    : "" }
                            </div> 
                        ))}
                        </div>}
                )}    
        </div>
    )}    


export default IssuesGrid
