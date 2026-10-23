import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Job from '../models/Job.js';

try {
  await mongoose.connect(process.env.MONGO_URI);

  const email = process.env.ADMIN_EMAIL || 'admin@college.edu';
  const password = process.env.ADMIN_PASSWORD;

  if (!password || password.length < 8) {
    throw new Error('Set ADMIN_PASSWORD in .env');
  }

  const passwordHash = await bcrypt.hash(password, 12);

  // Create admin or update existing admin password
  const admin = await User.findOneAndUpdate(
    { email },
    {
      $set: {
        name: 'Placement Officer',
        passwordHash,
        role: 'admin'
      }
    },
    {
      upsert: true,
      new: true,
      runValidators: true
    }
  );

  // Create sample jobs only if no jobs exist
  if (await Job.countDocuments() === 0) {
    await Job.insertMany([
      {
        company: 'TechNova',
        role: 'Software Engineer Intern',
        description: 'Backend and frontend development',
        package: '₹6 LPA',
        deadline: new Date(Date.now() + 45 * 86400000),
        eligibility: {
          minSolved: 100,
          minCgpa: 7,
          branches: ['CSE', 'IT']
        },
        createdBy: admin.id
      },
      {
        company: 'CloudWorks',
        role: 'Graduate Developer',
        description: 'Entry-level developer role',
        package: '₹8 LPA',
        deadline: new Date(Date.now() + 60 * 86400000),
        eligibility: {
          minSolved: 200,
          minCgpa: 7.5,
          branches: []
        },
        createdBy: admin.id
      }
    ]);
  }

  console.log('Admin account created/updated successfully!');
  console.log('Admin email:', email);

} catch (error) {
  console.error('Seed error:', error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}