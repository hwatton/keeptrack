import React from 'react'
import { Project } from './Project'
import { Link } from 'react-router-dom'

interface ProjectCardProps{
    project: Project;
    onEdit: (project :Project) => void;
}

function minifyCharacters(string: string, characters :number) {
    const newString = string.substring(0,characters) + "..."
    return newString
}

function ProjectCard(props : ProjectCardProps) {


    const { project, onEdit }  = props;

    const handleEditClick = (projectBeingEdited: Project) => {
        onEdit(projectBeingEdited)
    }


    return(
        <div className="card">
    <img src={project.imageUrl} alt={project.name} />
    <section className="section dark">
    <Link to={'/projects/' + project.id}>
      <h5 className="strong">
        <strong>{project.name}</strong>
      </h5>
      <p>{minifyCharacters(project.description, 60)}</p>
      <p>Budget: £{project.budget.toLocaleString()}</p>
      </Link>
      <button className="bordered"
      onClick={()=>{handleEditClick(project)}}>
  <span className="icon-edit "></span>
  Edit
</button>
    </section>
  </div>
    )

}

export default ProjectCard