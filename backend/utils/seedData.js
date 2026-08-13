const mongoose = require('mongoose');
const config = require('../config/config');
const User = require('../models/User');
const Department = require('../models/Department');
const Internship = require('../models/Internship');
const Workshop = require('../models/Workshop');
const TechnicalSkill = require('../models/TechnicalSkill');
const Project = require('../models/Project');
const AuditLog = require('../models/AuditLog');

const seedAll = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('[SGIT Seeder] Connected to MongoDB...');

    // Clear collections
    await User.deleteMany();
    await Department.deleteMany();
    await Internship.deleteMany();
    await Workshop.deleteMany();
    await TechnicalSkill.deleteMany();
    await Project.deleteMany();
    await AuditLog.deleteMany();

    // Create Super Admin Account
    const superadmin = await User.create({
      name: 'SGIT Super Admin',
      email: 'superadmin@gmail.com',
      password: '@Sgit1997',
      role: 'superadmin',
      department: 'Executive Governance',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      bio: 'Chancellor & Platform Master Administrator @ SGIT AUTONOMOUS',
      isVerified: true
    });

    // Create Admin Account
    const admin = await User.create({
      name: 'SGIT Branch Admin',
      email: 'admin@gmail.com',
      password: '@Branchhod123',
      role: 'admin',
      department: 'CSE',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      bio: 'Academic Head & Placement Coordinator @ SGIT AUTONOMOUS',
      isVerified: true
    });

    // Create Sample Student Account
    const student = await User.create({
      name: 'Alex Johnson',
      email: 'student@gmail.com',
      password: 'password123',
      role: 'student',
      department: 'CSE',
      enrollmentNo: 'SGIT-2024-089',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: 'Final Year Full-Stack Engineering Scholar @ SGIT AUTONOMOUS',
      skills: ['React', 'Node.js', 'MongoDB', 'Python', 'Docker'],
      isVerified: true
    });

    // Create 7 Standardized Departments
    await Department.create([
      { name: 'Computer Science & Engineering', code: 'CSE', description: 'AI, Distributed Systems & Core Software Engineering', headOfDepartment: 'Dr. Robert Harrison', studentCount: 680, facultyCount: 34, placementRate: 98 },
      { name: 'Artificial Intelligence & Machine Learning', code: 'AI & ML', description: 'Neural Networks, Deep Learning & LLM Fine-Tuning', headOfDepartment: 'Dr. Aris Thorne', studentCount: 450, facultyCount: 26, placementRate: 96 },
      { name: 'Computer Science & Design', code: 'CSD', description: 'UI/UX Engineering, Product Design & Human Computer Interaction', headOfDepartment: 'Prof. Clara Vance', studentCount: 380, facultyCount: 22, placementRate: 95 },
      { name: 'Electronics & Communication Engineering', code: 'ECE', description: 'VLSI Circuitry, Microcontrollers & IoT Robotics', headOfDepartment: 'Dr. Vikram Shah', studentCount: 510, facultyCount: 28, placementRate: 92 },
      { name: 'Electrical & Electronics Engineering', code: 'EEE', description: 'Power Systems, Renewable Energy & Smart Grid Tech', headOfDepartment: 'Prof. David Miller', studentCount: 420, facultyCount: 24, placementRate: 90 },
      { name: 'Civil Engineering', code: 'Civil', description: 'Structural Engineering, Urban Planning & Smart Infrastructure', headOfDepartment: 'Dr. Anita Roy', studentCount: 350, facultyCount: 20, placementRate: 88 },
      { name: 'Mechanical Engineering', code: 'Mechanical', description: 'Thermal Dynamics, CAD/CAM Manufacturing & Mechatronics', headOfDepartment: 'Prof. Arthur Pendelton', studentCount: 490, facultyCount: 27, placementRate: 89 }
    ]);

    // Create Sample Internships
    await Internship.create([
      {
        title: 'Full Stack Software Engineer Intern',
        company: 'Stripe Global',
        location: 'San Francisco, CA (Remote)',
        type: 'Remote',
        stipend: '$6,500 / month',
        duration: '6 Months',
        eligibility: 'SGIT B.Tech CSE / CSD 3rd & 4th Year',
        deadline: '2026-09-15',
        applyUrl: 'https://stripe.com/jobs',
        description: 'Work alongside core infrastructure team building scalable payment APIs and React dashboard interfaces.',
        skillsRequired: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
        companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80'
      },
      {
        title: 'AI & ML Systems Engineer Intern',
        company: 'Google Research Labs',
        location: 'Mountain View, CA (Hybrid)',
        type: 'Hybrid',
        stipend: '$7,200 / month',
        duration: '3 Months',
        eligibility: 'SGIT AI & ML / CSE Scholars',
        deadline: '2026-09-20',
        applyUrl: 'https://careers.google.com',
        description: 'Fine-tune multi-modal Large Language Models, optimize tensor vector embeddings, and build evaluation pipelines.',
        skillsRequired: ['Python', 'PyTorch', 'Transformers', 'Vector DB'],
        companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=120&auto=format&fit=crop&q=80'
      }
    ]);

    // Create Sample Workshops
    await Workshop.create([
      {
        title: 'Building Enterprise Microservices with Node.js & Docker',
        speaker: 'Sarah Jenkins',
        speakerRole: 'Principal Architect @ Netflix',
        category: 'Backend & Cloud',
        date: '2026-08-25',
        time: '02:00 PM EST',
        venue: 'SGIT Main Auditorium & Live Stream',
        description: 'Hands-on masterclass on building fault-tolerant Node.js microservices, gRPC messaging, and container deployment.',
        capacity: 250,
        registeredStudents: [student._id]
      }
    ]);

    // Create Technical Skills
    await TechnicalSkill.create([
      {
        title: 'Full Stack MERN Web Engineering',
        category: 'Web Engineering',
        level: 'Advanced',
        description: 'Comprehensive mastery of HTML5, Modern Glassmorphism CSS, React 18, Node.js, Express, and MongoDB.',
        icon: 'Code',
        roadmapSteps: [
          { stepNumber: 1, title: 'HTML5, CSS Glassmorphism & JS ES6+', details: 'Master DOM manipulation, flexbox/grid layouts, async/await.' },
          { stepNumber: 2, title: 'React 18 & State Architecture', details: 'Hooks, State Management, Custom components, Performance optimization.' },
          { stepNumber: 3, title: 'Backend REST API & Database Security', details: 'Express controllers, Mongoose schemas, JWT Auth & RBAC security.' }
        ],
        youtubeVideos: [
          { title: 'Full Stack MERN Architecture Masterclass 2026', url: 'https://youtube.com', channel: 'TechLead Academy', duration: '2h 45m' }
        ]
      }
    ]);

    // Create Sample Projects
    await Project.create([
      {
        title: 'Autonomous AI Code Reviewer Platform',
        type: 'Major',
        department: 'CSE',
        abstract: 'An enterprise web platform integrating GitHub webhooks for real-time static code analysis and LLM security audits.',
        techStack: ['React', 'Node.js', 'Python', 'Docker', 'OpenAI API'],
        githubUrl: 'https://github.com',
        liveDemoUrl: 'https://vercel.com',
        authorName: student.name,
        authorId: student._id,
        featured: true,
        stars: 142
      }
    ]);

    // Create Audit Log
    await AuditLog.create([
      { actor: superadmin.email, role: 'superadmin', action: 'SGIT_BOOT', details: 'SGIT AUTONOMOUS Ecosystem Seeded Successfully' }
    ]);

    console.log('[SGIT Seeder] Seeding Completed Successfully!');
    console.log('----------------------------------------------------');
    console.log('SGIT Super Admin: superadmin@gmail.com / @Sgit1997');
    console.log('SGIT Admin:       admin@gmail.com / @Branchhod123');
    console.log('SGIT Student:     student@gmail.com / password123');
    console.log('----------------------------------------------------');

    if (require.main === module) {
      process.exit(0);
    }
  } catch (err) {
    console.error('[SGIT Seeder Error]:', err);
    if (require.main === module) {
      process.exit(1);
    }
  }
};

if (require.main === module) {
  seedAll();
}

module.exports = seedAll;
