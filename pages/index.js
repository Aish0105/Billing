// pages/index.js
'use client';
import { useState } from 'react';
import BillHeading from '../components/BillHeading';
import ProjectDropdown from '../components/ProjectDropdown';
import ExpenseDetails from '../components/ExpenseDetails';





export default function Home() {
  const [selectedProjectId, setSelectedProjectId] = useState('');

  

//   return (
//     <div className="min-h-screen">
//       <BillHeading />
//       <div className="container mx-auto p-4">
//         <ProjectDropdown onProjectSelect={setSelectedProjectId} />
//         <ExpenseDetails projectId={selectedProjectId} />
        

//       </div>

//     </div>
    
//   );
// }

return (
  <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
    <BillHeading />

    <h2 className="text-xl font-semibold">Invoice Generator</h2>
    <ProjectDropdown onSelect={setSelectedProjectId} />
    {selectedProjectId && <ExpenseDetails projectId={selectedProjectId} />}
  </div>
);
}