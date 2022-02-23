import React from 'react'
import { Project } from './Project'

interface ProjectCardProps{
    project: Project;
    onEdit: (prokect :Project) => void;
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
      <h5 className="strong">
        <strong>{project.name}</strong>
      </h5>
      <p>{minifyCharacters(project.description, 60)}</p>
      <p>{project.budget.toLocaleString()}</p>
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