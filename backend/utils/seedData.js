const mongoose = require('mongoose');
const config = require('../config/config');
const User = require('../models/User');
const AcademicProfile = require('../models/AcademicProfile');
const Department = require('../models/Department');
const Internship = require('../models/Internship');
const Workshop = require('../models/Workshop');
const TechnicalSkill = require('../models/TechnicalSkill');
const Project = require('../models/Project');
const AuditLog = require('../models/AuditLog');
const CMSContent = require('../models/CMSContent');
const YouTubeResource = require('../models/YouTubeResource');

const seedAll = async () => {
  try {
    try {
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(config.MONGO_URI, { serverSelectionTimeoutMS: 2000 });
        console.log('[SGIT Seeder] Connected to MongoDB...');
      }
    } catch (dbErr) {
      console.log('[SGIT Seeder] MongoDB not available locally. In-memory data fallback enabled.');
      return;
    }

    // Clear collections
    await User.deleteMany();
    await AcademicProfile.deleteMany();
    await Department.deleteMany();
    await Internship.deleteMany();
    await Workshop.deleteMany();
    await TechnicalSkill.deleteMany();
    await Project.deleteMany();
    await AuditLog.deleteMany();
    await CMSContent.deleteMany();
    await YouTubeResource.deleteMany();

    // Create Super Admin Account (Support both sadminedu.com and sadmin@edu.com)
    const superadmin1 = await User.create({
      name: 'SGIT Super Admin',
      email: 'sadminedu.com',
      password: 'sgit1997',
      role: 'superadmin',
      department: 'Executive Governance',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      bio: 'Chancellor & Platform Master Administrator @ SGIT AUTONOMOUS',
      isVerified: true
    });

    const superadmin2 = await User.create({
      name: 'SGIT Super Admin',
      email: 'sadmin@edu.com',
      password: 'sgit1997',
      role: 'superadmin',
      department: 'Executive Governance',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      bio: 'Chancellor & Platform Master Administrator @ SGIT AUTONOMOUS',
      isVerified: true
    });

    // Create Admin Account (admin@edu.com / 1997)
    const admin = await User.create({
      name: 'SGIT Branch Admin',
      email: 'admin@edu.com',
      password: '1997',
      role: 'admin',
      department: 'CSE',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      bio: 'Academic Head & Placement Coordinator @ SGIT AUTONOMOUS',
      isVerified: true
    });

    // Create Official Demo Student Account (As requested)
    const student = await User.create({
      name: 'CQMS P. ROHITH',
      email: 'student@sgit.edu',
      password: 'SgitStudent@1997',
      role: 'student',
      department: 'CSE',
      enrollmentNo: 'SGIT-2024-DEMO',
      enrollmentId: 'SGIT-2024-DEMO',
      year: '3rd Year',
      semester: '6th Semester',
      phone: '+91 98765 43210',
      careerGoal: 'Software Developer & Defense Technology Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: 'Enthusiastic Learner, CQMS NCC Cadet & Aspiring Software Engineer @ SGIT AUTONOMOUS',
      skills: ['JavaScript', 'React', 'Python', 'SQL', 'Git', 'Data Structures'],
      completedSkills: ['JavaScript', 'Git', 'React'],
      completedVideos: ['v1', 'v3'],
      bookmarks: ['p1', 's2'],
      certifications: ['Full-Stack Web Engineering', 'Python Fundamentals', 'NCC B-Certificate'],
      achievements: ['Selected for State Parade (LRDC Camp)', 'SGIT Autonomous Innovation Winner'],
      nccStatus: 'CQMS (State Parade Selected)',
      nssStatus: 'Active Volunteer',
      atsScore: 82,
      isVerified: true
    });

    // Seed Academic Profile for Student
    await AcademicProfile.create({
      studentId: student._id,
      semesters: [
        {
          semesterNumber: 1,
          semesterCredits: 20,
          semesterSGPA: 8.40,
          subjects: [
            { subjectName: 'Mathematics I', credits: 4, marks: 88, grade: 'A', gradePoint: 9, creditPoints: 36 },
            { subjectName: 'Engineering Physics', credits: 4, marks: 82, grade: 'A', gradePoint: 9, creditPoints: 36 },
            { subjectName: 'C Programming & Data Structures', credits: 4, marks: 92, grade: 'S', gradePoint: 10, creditPoints: 40 },
            { subjectName: 'Engineering Graphics', credits: 3, marks: 74, grade: 'B', gradePoint: 8, creditPoints: 24 },
            { subjectName: 'Basic Electrical Engineering', credits: 3, marks: 68, grade: 'C', gradePoint: 7, creditPoints: 21 },
            { subjectName: 'Physics Laboratory', credits: 2, marks: 95, grade: 'S', gradePoint: 10, creditPoints: 20 }
          ]
        },
        {
          semesterNumber: 2,
          semesterCredits: 20,
          semesterSGPA: 8.60,
          subjects: [
            { subjectName: 'Mathematics II', credits: 4, marks: 85, grade: 'A', gradePoint: 9, creditPoints: 36 },
            { subjectName: 'Engineering Chemistry', credits: 4, marks: 78, grade: 'B', gradePoint: 8, creditPoints: 32 },
            { subjectName: 'Object Oriented Programming with C++', credits: 4, marks: 94, grade: 'S', gradePoint: 10, creditPoints: 40 },
            { subjectName: 'Environmental Studies', credits: 3, marks: 88, grade: 'A', gradePoint: 9, creditPoints: 27 },
            { subjectName: 'Technical English', credits: 3, marks: 76, grade: 'B', gradePoint: 8, creditPoints: 24 },
            { subjectName: 'C++ Lab', credits: 2, marks: 90, grade: 'S', gradePoint: 10, creditPoints: 20 }
          ]
        },
        {
          semesterNumber: 3,
          semesterCredits: 22,
          semesterSGPA: 8.25,
          subjects: [
            { subjectName: 'Discrete Mathematics', credits: 4, marks: 79, grade: 'B', gradePoint: 8, creditPoints: 32 },
            { subjectName: 'Data Structures & Algorithms', credits: 4, marks: 91, grade: 'S', gradePoint: 10, creditPoints: 40 },
            { subjectName: 'Computer Organization & Architecture', credits: 4, marks: 72, grade: 'B', gradePoint: 8, creditPoints: 32 },
            { subjectName: 'Digital Logic Design', credits: 3, marks: 84, grade: 'A', gradePoint: 9, creditPoints: 27 },
            { subjectName: 'Java Programming', credits: 4, marks: 86, grade: 'A', gradePoint: 9, creditPoints: 36 },
            { subjectName: 'Data Structures Lab', credits: 3, marks: 92, grade: 'S', gradePoint: 10, creditPoints: 30 }
          ]
        },
        {
          semesterNumber: 4,
          semesterCredits: 22,
          semesterSGPA: 8.50,
          subjects: [
            { subjectName: 'Probability & Statistics', credits: 4, marks: 83, grade: 'A', gradePoint: 9, creditPoints: 36 },
            { subjectName: 'Operating Systems', credits: 4, marks: 88, grade: 'A', gradePoint: 9, creditPoints: 36 },
            { subjectName: 'Database Management Systems', credits: 4, marks: 95, grade: 'S', gradePoint: 10, creditPoints: 40 },
            { subjectName: 'Formal Languages & Automata', credits: 3, marks: 71, grade: 'B', gradePoint: 8, creditPoints: 24 },
            { subjectName: 'Software Engineering', credits: 4, marks: 82, grade: 'A', gradePoint: 9, creditPoints: 36 },
            { subjectName: 'DBMS Lab', credits: 3, marks: 94, grade: 'S', gradePoint: 10, creditPoints: 30 }
          ]
        },
        {
          semesterNumber: 5,
          semesterCredits: 22,
          semesterSGPA: 8.75,
          subjects: [
            { subjectName: 'Computer Networks', credits: 4, marks: 90, grade: 'S', gradePoint: 10, creditPoints: 40 },
            { subjectName: 'Web Technologies & React', credits: 4, marks: 96, grade: 'S', gradePoint: 10, creditPoints: 40 },
            { subjectName: 'Design & Analysis of Algorithms', credits: 4, marks: 85, grade: 'A', gradePoint: 9, creditPoints: 36 },
            { subjectName: 'Artificial Intelligence Basics', credits: 3, marks: 82, grade: 'A', gradePoint: 9, creditPoints: 27 },
            { subjectName: 'Compiler Design', credits: 4, marks: 74, grade: 'B', gradePoint: 8, creditPoints: 32 },
            { subjectName: 'Web Development Lab', credits: 3, marks: 95, grade: 'S', gradePoint: 10, creditPoints: 30 }
          ]
        },
        { semesterNumber: 6, semesterCredits: 0, semesterSGPA: 0, subjects: [] },
        { semesterNumber: 7, semesterCredits: 0, semesterSGPA: 0, subjects: [] },
        { semesterNumber: 8, semesterCredits: 0, semesterSGPA: 0, subjects: [] }
      ],
      cgpa: 8.50,
      degreeClass: 'First Class with Distinction',
      completedCredits: 106,
      academicStanding: 'Outstanding'
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

    // Create Technical Skills across 15 categories
    await TechnicalSkill.create([
      { title: 'Data Structures & Algorithms', category: 'Data Structures', level: 'Advanced', description: 'Master Arrays, Linked Lists, Trees, Graphs, Dynamic Programming & Time Complexity.', icon: 'Code' },
      { title: 'Modern React 18 & Redux Toolkit', category: 'Web Development', level: 'Intermediate', description: 'Hooks, Context API, Redux Toolkit, Framer Motion animations & responsive design.', icon: 'Layout' },
      { title: 'Core Java & OOP Architecture', category: 'Programming', level: 'Beginner', description: 'Inheritance, Polymorphism, Exception Handling, Collections Framework & Multithreading.', icon: 'Terminal' },
      { title: 'Python for Enterprise & AI', category: 'Programming', level: 'Intermediate', description: 'Data structures, Decorators, Generators, Pandas, NumPy & AsyncIO.', icon: 'Cpu' },
      { title: 'Deep Learning & Neural Networks', category: 'AI', level: 'Advanced', description: 'PyTorch, TensorFlow, CNNs, RNNs, Transformers & Vector Embeddings.', icon: 'Brain' },
      { title: 'Machine Learning Pipelines', category: 'Machine Learning', level: 'Intermediate', description: 'Supervised & Unsupervised learning, Scikit-learn, Feature Engineering.', icon: 'Activity' },
      { title: 'Data Science & Visual Analytics', category: 'Data Science', level: 'Intermediate', description: 'Exploratory data analysis, Matplotlib, Seaborn, Tableau & SQL analytics.', icon: 'BarChart' },
      { title: 'AWS Cloud Architecture & Serverless', category: 'Cloud', level: 'Advanced', description: 'EC2, S3, Lambda, DynamoDB, VPC, CloudFront & Infrastructure as Code.', icon: 'Cloud' },
      { title: 'Cyber Security & Ethical Hacking', category: 'Cyber Security', level: 'Intermediate', description: 'Network security, Penetration testing, Cryptography, OWASP Top 10.', icon: 'Shield' },
      { title: 'DevOps & Docker Containerization', category: 'DevOps', level: 'Intermediate', description: 'Docker, Kubernetes, CI/CD Pipelines, GitHub Actions & Nginx.', icon: 'Server' },
      { title: 'Relational & NoSQL Databases', category: 'Databases', level: 'Intermediate', description: 'PostgreSQL, MongoDB, Indexing, Query Optimization & Schema Design.', icon: 'Database' },
      { title: 'Git & GitHub Collaboration', category: 'Git & GitHub', level: 'Beginner', description: 'Branching strategies, Pull requests, Merge conflicts, Rebase & Actions.', icon: 'GitBranch' },
      { title: 'Flutter Cross-Platform App Dev', category: 'App Development', level: 'Intermediate', description: 'Dart programming, State management, Native integrations & Play Store release.', icon: 'Smartphone' },
      { title: 'Quantitative Aptitude & Logic', category: 'Aptitude', level: 'Beginner', description: 'Speed math, Probability, Permutations, Puzzles & Problem solving.', icon: 'HelpCircle' },
      { title: 'Corporate Verbal & Tech Communication', category: 'Communication', level: 'Beginner', description: 'Interview presentation, Public speaking, Resume articulation & Soft skills.', icon: 'MessageSquare' }
    ]);

    // Create Sample Projects
    await Project.create([
      {
        title: 'Autonomous AI Code Reviewer Platform',
        type: 'Major Projects',
        category: 'AI/ML Projects',
        department: 'CSE',
        difficulty: 'Advanced',
        description: 'An enterprise web platform integrating GitHub webhooks for real-time static code analysis and LLM security audits.',
        problemStatement: 'Manual code reviews bottleneck deployment cycles and miss subtle vulnerability exploits.',
        features: ['Automated PR Analysis', 'LLM Vulnerability Detection', 'Custom Style Rules', 'Slack Alert Hooks'],
        architecture: 'React Frontend -> Node.js API Gateway -> Python LLM Service -> PostgreSQL',
        techStack: ['React', 'Node.js', 'Python', 'Docker', 'OpenAI API'],
        githubUrl: 'https://github.com/sgit-projects/ai-code-reviewer',
        liveDemoUrl: 'https://ai-reviewer.sgit.edu',
        documentation: 'https://docs.sgit.edu/projects/ai-reviewer',
        recommendedSkills: ['React', 'Python', 'Docker'],
        authorName: student.name,
        authorId: student._id,
        featured: true,
        stars: 142
      },
      {
        title: 'Smart IoT Campus Energy & Solar Monitor',
        type: 'Major Projects',
        category: 'IoT Projects',
        department: 'EEE',
        difficulty: 'Intermediate',
        description: 'Real-time telemetry dashboard monitoring SGIT 38-acre campus solar generation and indoor stadium power consumption.',
        problemStatement: 'Inefficient energy usage across campus facilities leads to unwanted utility costs.',
        features: ['Solar Inverter Telemetry', 'Live Wattage Charts', 'Overload Alerts', 'Automated Shutoff'],
        architecture: 'ESP32 Microcontroller Sensors -> MQTT Broker -> Express Node -> React Dashboard',
        techStack: ['C++', 'MQTT', 'Node.js', 'React', 'MongoDB'],
        githubUrl: 'https://github.com/sgit-projects/smart-solar-monitor',
        liveDemoUrl: 'https://solar.sgit.edu',
        documentation: 'https://docs.sgit.edu/projects/solar-monitor',
        recommendedSkills: ['Embedded Systems', 'IoT', 'React'],
        authorName: student.name,
        authorId: student._id,
        featured: true,
        stars: 98
      }
    ]);

    // Create YouTube Learning Resources
    await YouTubeResource.create([
      { title: 'Java Full Course for Beginners 2026', category: 'Java', youtubeUrl: 'https://www.youtube.com/watch?v=eIrMbAQSU34', youtubeId: 'eIrMbAQSU34', channel: 'FreeCodeCamp', duration: '9h 30m', level: 'Beginner' },
      { title: 'Python Programming Masterclass', category: 'Python', youtubeUrl: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc', youtubeId: '_uQrJ0TkZlc', channel: 'Programming with Mosh', duration: '6h 15m', level: 'Beginner' },
      { title: 'C Programming Complete Tutorial', category: 'C', youtubeUrl: 'https://www.youtube.com/watch?v=KJgsSFOSQv0', youtubeId: 'KJgsSFOSQv0', channel: 'FreeCodeCamp', duration: '4h 00m', level: 'Beginner' },
      { title: 'C++ Crash Course for Engineering Scholars', category: 'C++', youtubeUrl: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y', youtubeId: 'vLnPwxZdW4Y', channel: 'FreeCodeCamp', duration: '5h 45m', level: 'Intermediate' },
      { title: 'Modern JavaScript ES6+ Full Course', category: 'JavaScript', youtubeUrl: 'https://www.youtube.com/watch?v=hdI2bqOjy3c', youtubeId: 'hdI2bqOjy3c', channel: 'Traversy Media', duration: '3h 20m', level: 'Beginner' },
      { title: 'React 18 Complete Developer Course', category: 'React', youtubeUrl: 'https://www.youtube.com/watch?v=bMknfKXIFA8', youtubeId: 'bMknfKXIFA8', channel: 'FreeCodeCamp', duration: '11h 50m', level: 'Intermediate' },
      { title: 'Node.js & Express API Development', category: 'Node.js', youtubeUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE', youtubeId: 'Oe421EPjeBE', channel: 'FreeCodeCamp', duration: '8h 10m', level: 'Intermediate' },
      { title: 'SQL & Relational Database Masterclass', category: 'SQL', youtubeUrl: 'https://www.youtube.com/watch?v=HXV3zeQKqGY', youtubeId: 'HXV3zeQKqGY', channel: 'FreeCodeCamp', duration: '4h 20m', level: 'Beginner' },
      { title: 'Data Structures & Algorithms in Java/C++', category: 'DSA', youtubeUrl: 'https://www.youtube.com/watch?v=8hly31xKLI0', youtubeId: '8hly31xKLI0', channel: 'Striver TakeUForward', duration: '15h 00m', level: 'Advanced' },
      { title: 'Artificial Intelligence & Neural Networks', category: 'AI', youtubeUrl: 'https://www.youtube.com/watch?v=JMUxmLyrhSk', youtubeId: 'JMUxmLyrhSk', channel: '3Blue1Brown', duration: '2h 40m', level: 'Intermediate' },
      { title: 'Machine Learning Specialization', category: 'ML', youtubeUrl: 'https://www.youtube.com/watch?v=i_LwzRVP7bg', youtubeId: 'i_LwzRVP7bg', channel: 'StatQuest', duration: '7h 30m', level: 'Intermediate' },
      { title: 'Data Science & Pandas Deep Dive', category: 'Data Science', youtubeUrl: 'https://www.youtube.com/watch?v=vmEHCJofslg', youtubeId: 'vmEHCJofslg', channel: 'Keith Galli', duration: '5h 10m', level: 'Intermediate' },
      { title: 'AWS Certified Cloud Practitioner Tutorial', category: 'Cloud', youtubeUrl: 'https://www.youtube.com/watch?v=SOTamWNgDKc', youtubeId: 'SOTamWNgDKc', channel: 'FreeCodeCamp', duration: '13h 00m', level: 'Intermediate' },
      { title: 'Cyber Security Basics & Pen Testing', category: 'Cyber Security', youtubeUrl: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE', youtubeId: '3Kq1MIfTWCE', channel: 'NetworkChuck', duration: '6h 40m', level: 'Beginner' },
      { title: 'Git & GitHub Tutorial for Beginners', category: 'GitHub', youtubeUrl: 'https://www.youtube.com/watch?v=RGOj5yH7evk', youtubeId: 'RGOj5yH7evk', channel: 'FreeCodeCamp', duration: '1h 10m', level: 'Beginner' },
      { title: 'Placement Technical & HR Interview Prep', category: 'Placement Preparation', youtubeUrl: 'https://www.youtube.com/watch?v=1bGJ45f06R0', youtubeId: '1bGJ45f06R0', channel: 'Knowledge Gate', duration: '4h 15m', level: 'Intermediate' }
    ]);

    // Seed Extended CMS Sections (College Pride Carousel, NCC, NSS, Internship Portals)
    await CMSContent.create([
      {
        sectionKey: 'hero',
        title: 'SGIT AUTONOMOUS',
        subtitle: 'Center of Excellence in Engineering & Career Advancement',
        heading: 'Innovate, Excel & Transform Your Engineering Career',
        description: 'Empowering future technology leaders with autonomous academic rigor, hands-on enterprise projects, and AI-accelerated career development.',
        imageUrl: '/assets/sgit-logo.jpg',
        bannerText: 'Admissions Open for Academic Year 2026-2027 | NAAC A Grade Accredited'
      },
      {
        sectionKey: 'college_pride_slider',
        title: 'SGIT — Our College, Our Pride',
        subtitle: 'Celebrating the people, places and achievements that make SGIT special.',
        metadata: {
          slides: [
            {
              id: 'slide-1',
              title: '38-Acre Autonomous Campus',
              category: 'SGIT Campus',
              description: 'Dr. Samuel George Institute of Engineering & Technology (SGIT), established in 1997 at Markapur, Prakasam District, AP.',
              imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80',
              badge: 'SGIT AUTONOMOUS'
            },
            {
              id: 'slide-2',
              title: 'NCC Unit 186 COY',
              category: 'NCC',
              description: 'Official SGIT NCC Unit fostering discipline, leadership, national integration and defense preparedness.',
              imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1200&auto=format&fit=crop&q=80',
              badge: '🎖 NCC Unit 186'
            },
            {
              id: 'slide-3',
              title: 'NSS Social Service Unit',
              category: 'NSS',
              description: 'Empowering community service, blood donation camps, civic responsibility, and environmental stewardship.',
              imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&auto=format&fit=crop&q=80',
              badge: '🤝 NSS Unit'
            },
            {
              id: 'slide-4',
              title: 'Solar Powered Green Campus',
              category: 'Green Campus',
              description: '100% eco-friendly 38-acre green campus powered by rooftop solar energy grid and rainwater harvesting.',
              imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1200&auto=format&fit=crop&q=80',
              badge: '☀️ Green Energy'
            },
            {
              id: 'slide-5',
              title: 'State-of-the-Art Indoor Stadium & Sports Complex',
              category: 'Sports & Indoor Stadium',
              description: 'Badminton courts, table tennis, gymnasium, and outdoor sports arenas hosting inter-collegiate championships.',
              imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80',
              badge: '🏆 Sports Hub'
            },
            {
              id: 'slide-6',
              title: 'Central Digital Library & Research Center',
              category: 'Library',
              description: 'Over 45,000+ volumes, IEEE e-journals, digital reading room, and incubation research labs.',
              imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&auto=format&fit=crop&q=80',
              badge: '📚 Digital Library'
            }
          ]
        }
      },
      {
        sectionKey: 'ncc_info',
        title: 'SGIT NCC Unit (186 COY)',
        subtitle: 'Unity and Discipline — Nation First, Always.',
        heading: 'NCC Unit 186 COY @ Dr. Samuel George Institute of Engineering & Technology',
        description: 'SGIT maintains an active NCC Unit (186 COY) dedicated to building leadership, character, camaraderie, and military discipline among engineering scholars.',
        metadata: {
          unitName: '186 COY NCC Unit',
          established: '1997',
          objectives: [
            'Develop character, comradeship, discipline, and secular outlook',
            'Foster a spirit of adventure and ideals of selfless service',
            'Provide training for leadership in all walks of life',
            'Prepare youth to choose a career in the Armed Forces'
          ],
          activities: [
            'Annual Training Camps (ATC) & Combined Annual Training',
            'Republic Day Parade (RDC) Selection & Drill Training',
            'Shooting & Marksmanship Masterclasses',
            'Trekking, Survival Skill & Disaster Management Exercises'
          ],
          certificates: ['NCC B Certificate', 'NCC C Certificate']
        }
      },
      {
        sectionKey: 'nss_info',
        title: 'SGIT NSS Community Service Unit',
        subtitle: 'Not Me, But You — Empowering Society Through Youth Action.',
        heading: 'National Service Scheme (NSS) @ SGIT AUTONOMOUS',
        description: 'The NSS Unit at SGIT engages students in meaningful social work, rural development, emergency relief, health awareness, and national integration.',
        metadata: {
          motto: 'Not Me But You',
          objectives: [
            'Understand the community in which scholars work and live',
            'Develop among themselves a sense of social and civic responsibility',
            'Apply education in finding practical solutions to individual and community problems',
            'Acquire leadership qualities and democratic attitudes'
          ],
          activities: [
            'Mega Voluntary Blood Donation Drives',
            'Swachh Bharat Cleanliness & Plantation Campaigns',
            'Digital Literacy Workshops for Rural Schools',
            'Free Medical & Eye Checkup Camps in Prakasam Villages'
          ]
        }
      },
      {
        sectionKey: 'internship_portals',
        title: 'Free Internship Discovery Portals',
        subtitle: 'Explore verified official platforms offering free, paid, and stipend-based engineering internships.',
        metadata: {
          disclaimer: 'Students can discover free, stipend, or paid internship opportunities depending on employer listings. SGIT does not guarantee external portal terms.',
          portals: [
            {
              name: 'AICTE Internship Portal',
              logo: 'https://internship.aicte-india.org/images/aicte_logo.png',
              description: "AICTE's official Government portal connecting engineering students with verified government and corporate internships.",
              url: 'https://internship.aicte-india.org/',
              badge: 'Government Official',
              availability: '50,000+ Active Listings',
              wfhSupported: true
            },
            {
              name: 'Internshala',
              logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80',
              description: "India's largest internship & training platform for college scholars across software, core engineering, design and management.",
              url: 'https://internshala.com/',
              badge: 'Industry Leader',
              availability: '100,000+ Verified Companies',
              wfhSupported: true
            },
            {
              name: 'Unstop',
              logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
              description: 'Platform connecting students with hackathons, corporate coding challenges, case competitions, and hiring challenges.',
              url: 'https://unstop.com/',
              badge: 'Hackathons & Drives',
              availability: 'Corporate Competitions',
              wfhSupported: true
            },
            {
              name: 'LinkedIn Jobs',
              logo: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=100&auto=format&fit=crop&q=80',
              description: 'Global professional network for discovering early-career roles, software developer internships, and networking.',
              url: 'https://www.linkedin.com/jobs/',
              badge: 'Global Network',
              availability: 'Worldwide Tech Roles',
              wfhSupported: true
            }
          ]
        }
      },
      {
        sectionKey: 'about',
        title: 'About SGIT AUTONOMOUS',
        subtitle: 'Legacy of Academic Supremacy & Technical Mastery',
        description: 'Dr. Samuel George Institute of Engineering & Technology (SGIT), established in 1997 at Markapur, Prakasam District, Andhra Pradesh, is a NAAC A grade accredited autonomous institution.',
        heading: 'Empowering Students to Lead the Future of Technology'
      },
      {
        sectionKey: 'faq',
        title: 'Frequently Asked Questions',
        subtitle: 'Everything you need to know about SGIT AUTONOMOUS platform',
        metadata: {
          faqs: [
            { question: 'What is SGIT AUTONOMOUS Platform?', answer: 'SGIT AUTONOMOUS is an integrated career management, skill enhancement, and academic LMS platform tailored for engineering scholars.' },
            { question: 'How do I access student career tools?', answer: 'Log into your student portal to access AI Resume Builder, Cover Letter Maker, ATS Checker, and AI Mock Interviewer.' },
            { question: 'How do I register for campus placement drives?', answer: 'Browse the Internships and Placements portal in your dashboard to submit 1-click applications.' }
          ]
        }
      },
      {
        sectionKey: 'contact',
        title: 'Contact SGIT AUTONOMOUS',
        subtitle: 'Reach out to our academic administration and career placement cell',
        heading: 'We are here to assist your academic journey',
        description: 'George Town, Darimadugu (V), Markapur (M), Prakasam District, Andhra Pradesh - 523316.',
        bannerText: 'College Code: SGIT | Phone: +91 (800) 458-SGIT-EDU | Email: info@sgit.edu.in'
      }
    ]);

    // Create Audit Log
    await AuditLog.create([
      { actor: superadmin1.email, role: 'superadmin', action: 'SGIT_BOOT', details: 'SGIT AUTONOMOUS Ecosystem Seeded Successfully' }
    ]);

    console.log('[SGIT Seeder] Seeding Completed Successfully!');
    console.log('----------------------------------------------------');
    console.log('SGIT Super Admin: sadminedu.com (or sadmin@edu.com) / sgit1997');
    console.log('SGIT Admin:       admin@edu.com / 1997');
    console.log('SGIT Student:     student@sgit.edu / SgitStudent@1997');
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
