import db from '../../../db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { expenses, extraExpenses, inventory, grandTotal } = req.body;

      // Insert new invoice into the database
      const [result] = await db.query(
        `INSERT INTO invoices (expenses, extraExpenses, inventory, grandTotal, created_at) VALUES (?, ?, ?, ?, NOW())`,
        [
          JSON.stringify(expenses),
          JSON.stringify(extraExpenses),
          JSON.stringify(inventory),
          grandTotal,
        ]
      );

      res.status(201).json({
        message: 'Invoice saved successfully',
        invoice_id: result.insertId,
      });
    } catch (err) {
      console.error('Error saving invoice:', err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
