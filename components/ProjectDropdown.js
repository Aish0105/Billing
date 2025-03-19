import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

export default function ProjectDropdown({ onSelect }) {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    axios.get("/api/projects")
      .then((response) => {
        const projectOptions = response.data.map((project) => ({
          value: project.pid,
          label: `${project.pname} (ID: ${project.pid})`,
        }));
        setProjects(projectOptions);
      })
      .catch(() => setError("Failed to load projects"));
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedProject(selectedOption);
    onSelect(selectedOption ? selectedOption.value : ""); // Pass selected project ID
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg font-medium">Select a Project</label>
      {error && <p className="text-red-500">{error}</p>}
      <Select
        options={projects}
        value={selectedProject}
        onChange={handleChange}
        placeholder="Search or select a project..."
        isSearchable={true}
        className="w-full"
      />
    </div>
  );
}
