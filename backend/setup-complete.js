const db = require('./db.js');

// Fix DB column
db.query('ALTER TABLE servicerecord CHANGE SeviceDate ServiceDate DATE', err => console.log('DB fixed:', err ? err.code : 'OK'));

// Services
db.query(`INSERT IGNORE INTO services VALUES (1, 'Oil Change', 50000), (2, 'Car Wash', 10000), (3, 'Brake Repair', 150000), (4, 'Engine Repair', 500000)`, err => console.log('Services OK:', err ? err.code : 'OK'));

// Cars
db.query(`INSERT IGNORE INTO car VALUES 
  ('RAB123A', 'Sedan', 'Toyota Corolla', 2020, '0781234567', 'John Doe'), 
  ('RAC456B', 'SUV', 'Honda CRV', 2021, '0787654321', 'Jane Smith')
`, err => console.log('Cars OK:', err ? err.code : 'OK'));

