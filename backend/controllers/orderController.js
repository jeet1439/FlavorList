
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

export const getOrders = async (req, res) => {
  try {
    const { userId } = req.params;
     
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const orders = await sql`
      SELECT 
        o.id AS order_id,
        o.user_id,
        o.product_id,
        o.quantity,
        o.total_price,
        p.name AS product_name,
        p.image AS product_image,
        p.price AS product_price
      FROM orders o
      JOIN products p ON o.product_id = p.id
      WHERE o.user_id = ${userId}
      ORDER BY o.id DESC;
    `;

    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



