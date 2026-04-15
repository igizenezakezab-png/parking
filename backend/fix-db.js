const db = require('./db.js');

const records = [
  { serviceDate: '2024-10-15', serviceCode: 'S001', plateNumber: 'RAB123A' },
  { serviceDate: '2024-10-16', serviceCode: 'S002', plateNumber: 'RAC456B' },
  { serviceDate: '2024-10-17', serviceCode: 'S003', plateNumber: 'RAE789C' },
  { serviceDate: '2024-10-18', serviceCode: 'S004', plateNumber: 'RAA111B' }
];

records.forEach(({ serviceDate, serviceCode, plateNumber }, index) => {
  db.query(
    'INSERT IGNORE INTO servicerecord (ServiceDate, ServiceCode, PlateNumber) VALUES (?, ?, ?)',
    [serviceDate, serviceCode, plateNumber],
    (err, result) => {
      if (err) console.error(`Failed record ${index+1}:`, err.message);
      else console.log(`Seeded record ID ${result.insertId}`);
    }
  );
});

console.log('Seeding service records complete. Run: node fix-db.js');
setTimeout(() => db.end(), 3000);
