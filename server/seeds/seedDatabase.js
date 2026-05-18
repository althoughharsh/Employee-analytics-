const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employee = require('../models/Employee');
const User = require('../models/User');
const bcrypt = require('bcrypt');

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Create test user
    const userExists = await User.findOne({ email: 'test@test.com' });
    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      
      await User.create({
        email: 'test@test.com',
        password: hashedPassword,
      });
      console.log('✅ Test user created');
    } else {
      console.log('⚠️ Test user already exists');
    }

    // Clear existing employees
    await Employee.deleteMany({});
    console.log('Cleared existing employees');

    // Sample employee data
    const employees = [
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        department: 'Engineering',
        skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
        performanceScore: 92,
        experience: 6
      },
      {
        name: 'Michael Chen',
        email: 'michael.chen@company.com',
        department: 'Engineering',
        skills: ['Python', 'Django', 'PostgreSQL', 'DevOps', 'Docker'],
        performanceScore: 88,
        experience: 5
      },
      {
        name: 'Emma Rodriguez',
        email: 'emma.rodriguez@company.com',
        department: 'Design',
        skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Prototyping', 'User Research'],
        performanceScore: 85,
        experience: 4
      },
      {
        name: 'James Wilson',
        email: 'james.wilson@company.com',
        department: 'Product',
        skills: ['Product Management', 'Analytics', 'Strategy', 'Agile', 'Roadmapping'],
        performanceScore: 87,
        experience: 7
      },
      {
        name: 'Lisa Anderson',
        email: 'lisa.anderson@company.com',
        department: 'Engineering',
        skills: ['Java', 'Spring Boot', 'Kubernetes', 'Microservices', 'CI/CD'],
        performanceScore: 91,
        experience: 8
      },
      {
        name: 'David Kim',
        email: 'david.kim@company.com',
        department: 'Data Science',
        skills: ['Machine Learning', 'Python', 'TensorFlow', 'Data Analysis', 'SQL'],
        performanceScore: 89,
        experience: 5
      },
      {
        name: 'Sophie Martin',
        email: 'sophie.martin@company.com',
        department: 'Marketing',
        skills: ['Content Marketing', 'SEO', 'Analytics', 'Social Media', 'Campaign Management'],
        performanceScore: 83,
        experience: 4
      },
      {
        name: 'Robert Taylor',
        email: 'robert.taylor@company.com',
        department: 'Engineering',
        skills: ['Vue.js', 'Laravel', 'API Design', 'Testing', 'Git'],
        performanceScore: 86,
        experience: 6
      },
      {
        name: 'Amanda Lee',
        email: 'amanda.lee@company.com',
        department: 'HR',
        skills: ['Recruitment', 'Employee Relations', 'Payroll', 'Training', 'Compliance'],
        performanceScore: 84,
        experience: 5
      },
      {
        name: 'Chris Johnson',
        email: 'chris.johnson@company.com',
        department: 'Finance',
        skills: ['Financial Analysis', 'Budgeting', 'Excel', 'Forecasting', 'Reporting'],
        performanceScore: 82,
        experience: 6
      },
      {
        name: 'Nina Patel',
        email: 'nina.patel@company.com',
        department: 'Engineering',
        skills: ['Go', 'Rust', 'Systems Design', 'Performance Optimization', 'Linux'],
        performanceScore: 93,
        experience: 9
      },
      {
        name: 'Tom Davidson',
        email: 'tom.davidson@company.com',
        department: 'Sales',
        skills: ['B2B Sales', 'CRM', 'Negotiation', 'Client Management', 'Forecasting'],
        performanceScore: 81,
        experience: 7
      },
      {
        name: 'Jessica Brown',
        email: 'jessica.brown@company.com',
        department: 'Design',
        skills: ['Graphic Design', 'Branding', 'Motion Graphics', 'Illustrator', 'Web Design'],
        performanceScore: 86,
        experience: 5
      },
      {
        name: 'Marcus Thompson',
        email: 'marcus.thompson@company.com',
        department: 'Engineering',
        skills: ['React Native', 'JavaScript', 'Firebase', 'Mobile Development', 'Git'],
        performanceScore: 87,
        experience: 4
      },
      {
        name: 'Olivia Garcia',
        email: 'olivia.garcia@company.com',
        department: 'Data Science',
        skills: ['Data Engineering', 'Spark', 'Hadoop', 'Python', 'Scala'],
        performanceScore: 90,
        experience: 6
      }
    ];

    // Insert employees
    const insertedEmployees = await Employee.insertMany(employees);
    console.log(`✅ ${insertedEmployees.length} employees added to database`);

    // Show summary
    console.log('\n📊 Seed Data Summary:');
    console.log('==================');
    console.log(`Total Employees: ${insertedEmployees.length}`);
    console.log(`Test User Email: test@test.com`);
    console.log(`Test User Password: password123`);
    console.log('\n✨ Seeding completed successfully!');
    console.log('You can now login and view AI recommendations with the test data.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedData();
