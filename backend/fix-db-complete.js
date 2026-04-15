const db = require('./db.js');

// 1. Fix DB schema
db.query('ALTER TABLE servicerecord CHANGE SeviceDate ServiceDate DATE', (err) => {
  console.log('ServiceDate fixed:', !err || 'already exists');
});

// 2. Seed services (ServiceCode INT)
db.query('INSERT IGNORE INTO services (ServiceCode, ServiceName, ServicePrice) VALUES (1, "Oil Change", 50000), (2, "Car Wash", 10000), (3, "Brake Repair", 150000), (4, "Engine Repair", 500000)', (err) => {
  console.log('Services seeded');
});

// 3. Seed cars (PlateNumber PascalCase)
db.query('INSERT IGNORE INTO car (PlateNumber, type, Model, ManufacturingYear, DriverPhone, MechanicName) VALUES ("RAB123A", "Sedan", "Toyota Corolla", 2020, "0781234567", "John Doe"), ("RAC456B", "Sedan", "Honda Civic", 2019, "078234567
