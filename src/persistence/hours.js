const sql = require('sql-template-strings');
const {
  v4: uuidv4
} = require('uuid');
const db = require('./db');

module.exports = {
  async create([hours], location_id) {
    const savedHours = []

    try {
      hours.forEach(hour => {
        const {
          rows
        } = await db.query(sql `
                INSERT INTO hours (id, openDay, closeDay, openTime, closeTime)
                VALUES (${uuidv4()}, ${hour.openday}, ${hour.closeday}, ${hour.opentime}, ${hour.closetime})
                RETURNING id;
            `);
        await db.query(sql `
                INSERT INTO hours_set (location_id, hour_id)
                VALUES (${location_id}, ${rows.id}`)
        const hour = {
          rows
        };
        savedHours.push(hour);
      });

      return savedHours;
    } catch (error) {
      if (error.constraint === 'hours_key') {
        return null;
      }

      throw error;
    }
  },
  async find(id) {
    const {
      rows
    } = await db.query(sql `
    SELECT * FROM hours
    JOIN hours_set ON hours.id = hours_set.hours_id 
    WHERE hours_set.location_id=${id} LIMIT 1;
    `);
    return rows[0];
  }
};
