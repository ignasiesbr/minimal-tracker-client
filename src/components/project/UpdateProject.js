import React from 'react'


//TODO
const UpdateProject = ({project}) => {
    console.log(project.end);
    return (
        <div>
            <input type="date" name="" id=""/>

            <pre>{JSON.stringify(project, null, 2)}</pre>
        </div>
    )
}

export default UpdateProject
