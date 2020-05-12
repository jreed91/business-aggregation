const db = require('../persistence/db');

module.exports.up = async function(next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS businesses (
    id uuid PRIMARY KEY,
    name text
  );

  CREATE TABLE IF NOT EXISTS addresses (
    id uuid PRIMARY KEY,
    address_line text,
    locality text,
    region text,
    postal_code text 
  );

  CREATE TABLE IF NOT EXISTS hours (
    id uuid PRIMARY KEY,
    openDay text,
    closeDay text,
    openTime TIMESTAMP,
    closeTime TIMESTAMP   
  );

  CREATE TABLE IF NOT EXISTS locations (
    id uuid PRIMARY KEY,
    business_id uuid not null references businesses(id),
    location_name text,
    primary_phone text,
    website text,
    store_code text,
    address_id uuid not null references addresses(id),
    category_id text
  );

  CREATE TABLE IF NOT EXISTS hours_set (
    hours_id uuid not null references hours(id),
    location_id uuid not null references locations(id),
    PRIMARY KEY (hours_id, location_id)
  );
  `);

  await client.release(true);
  next();
};

module.exports.down = async function(next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE hours_set;
  DROP TABLE locations;
  DROP TABLE hours;
  DROP TABLE addresses;
  DROP TABLE businesses;
  `);

  await client.release(true);
  next();
};
