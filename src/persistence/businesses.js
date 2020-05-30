const sql = require('sql-template-strings');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

module.exports = {
  async create(name) {
    try {
      const {rows} = await db.query(sql`
      INSERT INTO businesses (id, name)
        VALUES (${uuidv4()}, ${name})
        RETURNING id, name;
      `);

      const [business] = rows;
      return business;
    } catch (error) {
      if (error.constraint === 'business_key') {
        return null;
      }

      throw error;
    }
  },
  async update(name) {
    try {
      const {rows} = await db.query(sql`
        UPDATE businesses (name)
        SET name = ${name}
        WHERE id =${id};
      `);

      const [business] = rows;
      return business;
    } catch (error) {
      if (error.constraint === 'business_key') {
        return null;
      }

      throw error;
    }
  },
  async find(id) {
    const {rows} = await db.query(sql`
    SELECT * FROM businesses WHERE id=${id} LIMIT 1;
    `);
    return rows[0];
  },
  async findAll() {
    const {rows} = await db.query(sql`
    SELECT * FROM businesses;
    `);
    return rows;
  }
};
