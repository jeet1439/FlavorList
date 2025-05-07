
import { sql } from '../config/db.js';

export const createOrder = async (req, res) => {
  try {
    const { user_id, product_id, quantity, total_price } = req.body;

    if (!user_id || !product_id || !quantity || !total_price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await sql`
      INSERT INTO orders (user_id, product_id, quantity, total_price)
      VALUES (${user_id}, ${product_id}, ${quantity}, ${total_price})
      RETURNING *;
    `;

    res.status(201).json({ message: 'Order created successfully', order: result[0] });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


