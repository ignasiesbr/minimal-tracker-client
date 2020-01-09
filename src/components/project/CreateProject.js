import React, {useState} from 'react'
import {connect} from 'react-redux';
import {createProject} from '../../actions/projects';

const CreateProject = ({createProject}) => {

    const [formData, setFormData] = useState({
        title:"",
        description: "",
        members: [""],
        start:"",
        end:""
    });

    const handleSubmit = e => {
        e.preventDefault();
        createProject(JSON.stringify(formData));
        setFormData({
            title:"",
            description: "",
            members: [""]
        });
    }

    const handleChange = e => {
        setFormData({...formData, [e.target.name]:e.target.value});
    };


    const handleAddMember = () => {
        setFormData({...formData, members: [...formData.members, ""]})
    }

    const handleChangeEmail = (e) => {
        let members = formData.members;
        members[[e.target.name]] = e.target.value;
        setFormData({...formData, members: members});
    };

    return (
        <div className="add-project-container .u-margin-top-small">
            <h1 className="heading-primary u-margin-bottom-medium">Create Project</h1>
            <form className="form2" onSubmit={e => handleSubmit(e)}>
                <label className="form2__label">Title of the project</label>
                <input className="form2__input u-margin-bottom-small" placeholder="Title" type="text" onChange={e => handleChange(e)} value={formData.title} name="title"/>
                <label className="form2__label">Description of the project</label>
                <textarea className="form2__textarea u-margin-bottom-medium" placeholder="Description" onChange={e => handleChange(e)} value={formData.description} name="description"></textarea>
                    <label className="form2__label">Start of the project *</label>
                    <input className="form2__input u-margin-bottom-small" type="date" name="start" onChange={e => handleChange(e)}/>
                    <label className="form2__label">End of the project *</label>
                    <input className="form2__input u-margin-bottom-small"  type="date" name="end" onChange={e => handleChange(e)}/>
                <label className="form2__label u-border-bottom-dark-medium u-margin-bottom-small">Members</label>
                <div className="add-member">
                    {formData.members.map((field, idx) => 
                        (
                            <div key={idx}>
                                <input className="form2__input add-project__member u-margin-bottom-small" placeholder="Email of the new member" onChange={(e) => handleChangeEmail(e)} 
                                    value={formData.members[idx]} type="email" name={idx} />
                            </div>
                        )
                    )}
                        <button className="btn2" type="button" onClick={handleAddMember}>Add a member</button>
                </div>
                    <button className="btn u-margin-bottom-small" type="submit">Create Project</button>
            </form>
            {/* <AddMember /> */}
        </div>
    )
}

export default connect(null, {createProject})(CreateProject)
