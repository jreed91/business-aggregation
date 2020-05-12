const sql = require('sql-template-strings');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

module.exports = {
  async create(business_id, location_name, primary_phone, website, store_code, addressId) {
    try {
      const {rows} = await db.query(sql`
      INSERT INTO locations (id, business_id, location_name, primary_phone, website, store_code, address_id)
        VALUES (${uuidv4()}, ${business_id}, ${location_name}, ${primary_phone}, ${website}, ${store_code}, ${addressId})
        RETURNING id;
      `);

      const [location] = rows;
      return location;
    } catch (error) {
      if (error.constraint === 'location_key') {
        return null;
      }

      throw error;
    }
  },
  async find(id) {
    const {rows} = await db.query(sql`
    SELECT * FROM location WHERE id=${id} LIMIT 1;
    `);
    return rows[0];
  }
};
