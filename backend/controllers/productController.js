import { sql } from "../config/db.js"


export const getProducts = async (req, res) => {
    try {
      const products = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC
      `;
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching products", error });
    }
  };
  
  export const createProduct = async (req, res) => {
    try {
      const { name, image, price, available } = req.body;
      if (!name || !image || !price) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }
  
      const newProduct = await sql`
        INSERT INTO products (name, image, price, available)
        VALUES (${name}, ${image}, ${price}, ${available ?? true})
        RETURNING *
      `;
  
      res.status(201).json({ success: true, data: newProduct[0] });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error creating product", error });
    }
  };
  
  export const getProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await sql`
        SELECT * FROM products WHERE id = ${id}
      `;
      if (product.length === 0) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      res.status(200).json({ success: true, data: product[0] });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching product", error });
    }
  };
  
  export const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, image, price, available } = req.body;
      const updatedProduct = await sql`
        UPDATE products
        SET name = COALESCE(${name}, name),
            image = COALESCE(${image}, image),
            price = COALESCE(${price}, price),
            available = COALESCE(${available}, available)
        WHERE id = ${id}
        RETURNING *
      `;
      if (updatedProduct.length === 0) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      res.status(200).json({ success: true, data: updatedProduct[0] });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error updating product", error });
    }
  };
  
  export const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await sql`
        DELETE FROM products WHERE id = ${id} RETURNING *
      `;
      if (deletedProduct.length === 0) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error deleting product", error });
    }
  };