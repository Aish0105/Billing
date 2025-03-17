// import db from '../../../db';

// export default async function handler(req, res) {
//   const { projectId } = req.query;

//   if (req.method === 'GET') {
//     try {
//       const results = await new Promise((resolve, reject) => {
//         db.query(
//           'SELECT * FROM add_expenses WHERE pid = ?', 
//           [projectId], 
//           (err, results) => {
//             if (err) {
//               reject(err);
//             } else {
//               resolve(results);
//             }
//           }
//         );
//       });

//       res.status(200).json(results);
//     } catch (err) {
//       console.error('Error fetching expenses:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }



import mysql from "mysql2/promise";

export default async function handler(req, res) {
    
  if (req.method !== "GET") return res.status(405).json({ error: "Method Not Allowed" });
  const { projectId } = req.query;
  if (!projectId) {
    return res.status(400).json({ error: "Project ID is required" });
  }

  const dbConfig = {
    host: "localhost",
    user: "root",
    password: "lovesql111*",
    database: "company_db",
  };

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [projects] = await connection.execute( "SELECT Exp_ID, Date, Amount, Status, Comments FROM add_expenses WHERE pid = ?", 
      [projectId]);
    await connection.end();

    res.status(200).json(projects);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: error.message });
  }
}
