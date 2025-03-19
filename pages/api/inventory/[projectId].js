import mysql from 'mysql2/promise';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { projectId } = req.query; // Get projectId from URL params

    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'lovesql111*',
            database: 'company_db',
        });

        // Fetch inventory data
        const [rows] = await db.execute(`
            SELECT 
                inventory_spent.spent_id, 
                rates.item_name, 
                inventory_spent.quantity_used, 
                rates.price_pu, 
                (inventory_spent.quantity_used * rates.price_pu) AS total_cost, 
                inventory_spent.remark 
            FROM inventory_spent 
            JOIN rates ON inventory_spent.stock_id = rates.item_id
            WHERE inventory_spent.used_for = ?
        `, [projectId]);

        await db.end();

        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Database error' });
    }
}
