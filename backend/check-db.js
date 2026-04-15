const db = require('./db.js');

db.query('SHOW TABLES', (err, results) => {
  if (err) {
    console.error('DB Error:', err);
    return;
  }
  console.log('Tables:', results.map(r => r['Tables_in_CRPMS'] || Object.values(r)[0]));
});

db.end();
