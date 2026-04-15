# Fix Report Page Errors (500 + map not function)

## Steps:
1. [x] Edit backend/server.js - change table from service_records to servicerecord (GET/POST)
2. [x] Edit frontend/practical_exam/src/pages/report.jsx - fix fetch error handling + Array.isArray check
3. [x] Run `node backend/fix-db.js` to create/seed servicerecord table
4. [x] Test /service_records endpoint returns array
5. [x] Refresh browser report page - verify no errors, shows data
6. [ ] Update this TODO.md - mark complete
7. [ ] attempt_completion

