const db = require('./db.js');

// Seed services
const services = [
  { servicecode: 'S001', serviceName: 'Oil Change', servicePrice: 50000 },
  { servicecode: 'S002', serviceName: 'Car Wash', servicePrice: 10000 },
  { servicecode: 'S003', serviceName: 'Brake Repair', servicePrice: 150000 },
  { servicecode: 'S004', serviceName: 'Engine Repair', servicePrice: 500000 }
];

services.forEach(({ servicecode, serviceName, servicePrice }) => {
  db.query(
    'INSERT IGNORE INTO services (servicecode, serviceName, servicePrice) VALUES (?, ?, ?)',
    [servicecode, serviceName, servicePrice],
    (err) => {
      if (err) console.error(`Failed service ${servicecode}:`, err.message);
      else console.log(`Seeded service: ${serviceName}`);
    }
  );
});

// Seed cars matching static plates
const cars = [
  { plate_number: 'RAB123A', model: 'Toyota Corolla', manufacturing_year: 2020, driver_phone: '0781234567', mechanical_name: 'John Doe' },
  { plate_number: 'RAC456B', model: 'Honda Civic', manufacturing_year: 2019, driver_phone: '0782345678', mechanical_name: 'Jane Smith' },
  { plate_number: 'RAE789C', model: 'Ford Focus', manufacturing_year: 2021, driver_phone: '0783456789', mechanical_name: 'Mike Johnson' },
  { plate_number: 'RAA111B', model: 'Nissan X-Trail', manufacturing_year: 2018, driver_phone: '0784567890', mechanical_name: 'Sarah Wilson' }
];

cars.forEach(({ plate_number, model, manufacturing_year, driver_phone, mechanical_name }) => {
  db.query(
    'INSERT IGNORE INTO car (plate_number, model, manufacturing_year, driver_phone, mechanical_name) VALUES (?, ?, ?, ?, ?)',
    [plate_number, model, manufacturing_year, driver_phone, mechanical_name],
    (err) => {
      if (err) console.error(`Failed car ${plate_number}:`, err.message);
      else console.log(`Seeded car: ${plate_number}`);
    }
  );
});

// Existing service records
const records = [
  { recordNumber: 'REC001', serviceDate: '2024-10-15', serviceCode: 'S001', plateNumber: 'RAB123A' },
  { recordNumber: 'REC002', serviceDate: '2024-10-16', serviceCode: 'S002', plateNumber: 'RAC456B' },
  { recordNumber: 'REC003', serviceDate: '2024-10-17', serviceCode: 'S003', plateNumber: 'RAE789C' },
  { recordNumber: 'REC004', serviceDate: '2024-10-18', serviceCode: 'S004', plateNumber: 'RAA111B' }
];

records.forEach(({ recordNumber, serviceDate, serviceCode, plateNumber }) => {
  db.query(
    'INSERT IGNORE INTO servicerecord (RecordNumber, ServiceDate, ServiceCode, PlateNumber) VALUES (?, ?, ?, ?)',
    [recordNumber, serviceDate, serviceCode, plateNumber],
    (err) => {
      if (err) console.error(`Failed record ${recordNumber}:`, err.message);
      else console.log(`Seeded record: ${recordNumber}`);
    }
  );
});

console.log('Full seed complete (services, cars, records). Close with Ctrl+C or wait.');
setTimeout(() => db.end(), 3000);

