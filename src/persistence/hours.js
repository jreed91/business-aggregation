const sql = require('sql-template-strings');
const {
  v4: uuidv4
} = require('uuid');
const db = require('./db');

module.exports = {
  async create(hours, location_id) {
    try {
      const savedHours = []
      for (const hour of hours) {
        const {rows} = await db.query(sql `
                INSERT INTO hours (id, openDay, closeDay, openTime, closeTime)
                VALUES (${uuidv4()}, ${hour.openDay}, ${hour.closeDay}, ${hour.openTime}, ${hour.closeTime})
                RETURNING id;
            `);
        const hourId = rows[0].id

        const {set} =  await db.query(sql `
                INSERT INTO hours_set (location_id, hours_id)
                VALUES (${location_id}, ${hourId})`)
        const savedHour = {rows};
        savedHours.push(savedHour);
      }
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
