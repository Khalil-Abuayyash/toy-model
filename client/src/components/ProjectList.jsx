import React, {useState, useEffect} from 'react';
import axiosInstance from '../axios';
import jwt from 'jwt-decode';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [userId, setUserId] = useState(0)

    useEffect(() => {
      const access_token = localStorage.getItem('access_token')
      if (access_token){
        const decoded_token = jwt(access_token)
        setUserId(decoded_token.user_id)
        axiosInstance.get('user/projects')
        .then(res => setProjects(res.data) )
        .catch(err => console.log(err))
      }

    }, []);

  return (
    <div>
    {projects.length > 0 ?
    (<div>
      <h1>Projects</h1>
      {projects.map(project => {
          return (
          <div key={project.id} >
              <h5 >{project.name} {project.users}</h5>
              {/* <span>{project['users'].includes(1) ? <button>View</button> : null}</span> */}
          </div>
        ) 
      } )}
    </div>)
    :
    <h1>No projects yet</h1>}
    </div>
  )
};

export default ProjectList;
