const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',           
  host: 'localhost',
  database: 'chatbot_ticket_booking', 
  password: 'pgadmin123',    
  port: 5432,                   
});

module.exports = pool;