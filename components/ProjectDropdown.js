// // components/ProjectDropdown.js
// 'use client';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function ProjectDropdown({ onProjectSelect }) {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     axios.get('/api/projects')
//       .then((response) => setProjects(response.data))
//       .catch((error) => console.error('Error fetching projects:', error));
//   }, []);

//   return (
//     <div className="flex flex-col space-y-2">
//       <label className="text-lg font-medium">Project ID</label>
//       <select onChange={(e) => onProjectSelect(e.target.value)} className="border p-2">
//         <option value="">Select a Project</option>
//         {projects.map((project) => (
//           <option key={project.pid} value={project.pid}>{project.pname}</option>
//         ))}
//       </select>
//     </div>
//   );
// }




import { useState, useEffect } from "react";

export default function ProjectDropdown({ onSelect }) {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((error) => setError("Failed to load projects"));
  }, []);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg font-medium">Select a Project</label>
      {error && <p className="text-red-500">{error}</p>}
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">-- Choose a Project --</option>
        {projects.map((project) => (
          <option key={project.pid} value={project.pid}>
            {project.pname} (ID: {project.pid})
          </option>
        ))}
      </select>
    </div>
  );
}
