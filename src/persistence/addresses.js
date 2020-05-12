const sql = require('sql-template-strings');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

module.exports = {
  async create(address_line, locality, region, postal_code) {
    try {
      const {rows} = await db.query(sql`
      INSERT INTO addresses (id, address_line, locality, region, postal_code)
        VALUES (${uuidv4()}, ${address_line}, ${locality}, ${region}, ${postal_code})
        RETURNING id;
      `);

      const [address] = rows;
      return address;
    } catch (error) {
      if (error.constraint === 'address_key') {
        return null;
      }

      throw error;
    }
  },
  async find(id) {
    const {rows} = await db.query(sql`
    SELECT * FROM addresses WHERE id=${id} LIMIT 1;
    `);
    return rows[0];
  }
};
