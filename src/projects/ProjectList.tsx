import { useState } from 'react'
import { Project } from './Project'
import ProjectCard from './ProjectCard'
import ProjectForm from './ProjectForm'

interface ProjectListProps {
    projects: Project[],
    onSave : (project: Project) => void
}

function ProjectList({projects, onSave} : ProjectListProps) {

    const [projectBeingEdited, setProjectBeingEdited] = useState({})

    const handleEdit = (project: Project) => {
setProjectBeingEdited(project)
    }



    const cancelEditing = ()=>{ setProjectBeingEdited({})}


    return <ul className="row">{projects.map((el)=>{
        return (
            <div 
            key={el.id}
            className="cols-sm">

{el === projectBeingEdited ? (  <ProjectForm project={el} onSave={onSave} onCancel={cancelEditing}/>) : (  <ProjectCard project={el} onEdit={handleEdit}></ProjectCard>)}



</div>
        )
    })}</ul>
}

export default ProjectList