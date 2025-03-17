// // pages/api/projects.js
// import db from '../../db';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const results = await new Promise((resolve, reject) => {
//         db.query('SELECT * FROM project', (err, results) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(results);
//           }
//         });
//       });
//       res.status(200).json(results);
//     } catch (err) {
//       console.error('Error fetching projects:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }










import db from '../../db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [results] = await db.query('SELECT * FROM project'); // Use async query
      res.status(200).json(results);
    } catch (err) {
      console.error('Error fetching projects:', err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
