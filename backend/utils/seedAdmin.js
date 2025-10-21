import { createUser, findUserByEmail } from '../models/userModel.js';
import bcrypt from 'bcrypt';

const adminEmail = 'admin@seatup.io';
const adminPassword = 'admin123';
const role = 'admin';

(async () => {
  const existing = await findUserByEmail(adminEmail);
  if (!existing) {
    const hash = await bcrypt.hash(adminPassword, 10);
    await createUser({ email: adminEmail, password: hash, role, name: 'Admin' });
    console.log('Admin seeded.');
  } else {
    console.log('Admin already exists.');
  }
  process.exit();
})();
