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
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { projectId } = req.query;
  if (!projectId) {
    return res.status(400).json({ error: "Project ID is required" });
  }

  const dbConfig = {
    host: "localhost",
    user: "root",
    password: "lovesql111*",  // Ensure this is correct
    database: "company_db",
  };

  try {
    const connection = await mysql.createConnection(dbConfig);

    // Updated query to include Category
    const [projects] = await connection.execute(
      `SELECT 
          e.Exp_ID, 
          e.Date, 
          e.Amount, 
          e.Status, 
          e.Comments, 
          COALESCE(c.category_name, 'Uncategorized') AS Category
       FROM add_expenses e
       LEFT JOIN rates r ON e.id = r.item_id
       LEFT JOIN category c ON r.category_id = c.category_id
       WHERE e.pid = ?;`, 
      [projectId]
    );

    await connection.end();

    res.status(200).json(projects);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: error.message });
  }
}
