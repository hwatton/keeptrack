import {MOCK_PROJECTS} from "./MockProjects"
import ProjectList from "./ProjectList"
import {Project} from "./Project"
import {useState, useEffect, } from 'react'
import { projectAPI } from './projectAPI'

function ProjectsPage(){

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>("")
    const [currentPage, setCurrentPage] = useState(1);

    const handleMoreClick = () => {
          setCurrentPage((currentPage) => currentPage + 1);
        }


    function saveProject(project: Project) {

      /*let updatedProjects = projects.map((p: Project) => {
                  return p.id === project.id ? project : p;
                });
              setProjects(updatedProjects);
              */
  projectAPI
     .put(project)
     .then((updatedProject) => {
       let updatedProjects = projects.map((p: Project) => {
         return p.id === project.id ? new Project(updatedProject) : p;
       });
       setProjects(updatedProjects);
     })
     .catch((e) => {
       setError(e.message);
     });
    }

useEffect(()=>{

  setLoading(true)
  projectAPI.get(currentPage)
  .then((data)=>{
    setError(null);
    setLoading(false)
    if (currentPage === 1) {
      setProjects(data)
    }else{
      setProjects((projects) => 
        [...projects, ...data]
      )
    }
    })
  .catch((e)=>{
    setLoading(false)
    setError(e.message)
  })
},[currentPage])

    return (
    <>
    <h1>Projects</h1>
    {error && (
       <div className="row">
         <div className="card large error">
           <section>
             <p>
               <span className="icon-alert inverse "></span>
               {error}
             </p>
           </section>
         </div>
       </div>
     )}
    <ProjectList projects={projects} onSave={saveProject}/>
    {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}
    {loading && (
      <div className="center-page">
      <span className="spinner primary"></span>
      <p>Loading...</p>
    </div>
    )}
    
   </> 
    )
}

export default ProjectsPage