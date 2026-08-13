import React, { useState } from 'react';
import { Cpu, Users, BookOpen, FolderGit2, Code, Video, Briefcase, Award } from 'lucide-react';

const DEPARTMENTS_DATA = [
  {
    code: 'CSE',
    name: 'Computer Science & Engineering',
    overview: 'Pioneer department specializing in Distributed Cloud Systems, High-Throughput Web Engineering, Software Architecture, and Cybersecurity.',
    faculty: [
      { name: 'Dr. Robert Harrison', role: 'Head of Department', area: 'Distributed Systems & Cloud Security' },
      { name: 'Prof. Marcus Brody', role: 'Associate Professor', area: 'Full-Stack Architecture & Databases' }
    ],
    resources: ['Cloud Infrastructure Lab', 'Linux Kernel Testing Environment', 'High Performance Computing Cluster'],
    projects: ['Autonomous Code Reviewer Platform', 'Distributed Event Streaming Engine'],
    skills: ['React 18', 'Node.js Microservices', 'MongoDB', 'Docker', 'Python'],
    videos: ['Full Stack Architecture Masterclass 2026', 'Cybersecurity Threat Detection'],
    placements: '98% Placement Rate • Top Package: 45 LPA (Stripe)',
    internships: ['Stripe Engineering Intern', 'Amazon AWS DevOps Intern']
  },
  {
    code: 'AI & ML',
    name: 'Artificial Intelligence & Machine Learning',
    overview: 'Advanced artificial intelligence research wing focused on Large Language Models, Tensor Neural Networks, Computer Vision, and Autonomous Robotics.',
    faculty: [
      { name: 'Dr. Aris Thorne', role: 'Head of Department', area: 'Deep Learning & Multi-Modal LLMs' },
      { name: 'Dr. Elena Rostova', role: 'Lead AI Researcher', area: 'Vector Search & Neural Networks' }
    ],
    resources: ['NVIDIA H100 Tensor GPU Cluster', 'PyTorch Lab', 'Autonomous Systems Workshop'],
    projects: ['Agentic RAG Assistant', 'Medical Imaging Diagnostics Model'],
    skills: ['Python', 'PyTorch', 'Transformers', 'LangChain', 'Vector DBs'],
    videos: ['Fine-Tuning LLMs Masterclass', 'Computer Vision Object Tracking'],
    placements: '96% Placement Rate • Top Package: 42 LPA (Google Research)',
    internships: ['Google AI Research Intern', 'OpenAI Research Fellow']
  },
  {
    code: 'CSD',
    name: 'Computer Science & Design',
    overview: 'Innovative interdisciplinary department merging Computer Science algorithms with modern Product UI/UX Design Systems and Front-End Craftsmanship.',
    faculty: [
      { name: 'Prof. Clara Vance', role: 'Head of Department', area: 'UI/UX Design Tokens & Framer Motion' },
      { name: 'Prof. Julian Croft', role: 'Design Technologist', area: 'Design Systems & CSS Architecture' }
    ],
    resources: ['Apple Design Studio Lab', 'Framer Motion Animation Suite', 'Usability Testing Lab'],
    projects: ['SGIT Royal Glassmorphism UI Engine', 'Interactive Design System Token Generator'],
    skills: ['Figma', 'React 18', 'Tailwind CSS', 'Framer Motion', 'Design Tokens'],
    videos: ['Building Glassmorphism Design Systems', 'Modern Design Tokens & Animations'],
    placements: '95% Placement Rate • Top Package: 38 LPA (Framer)',
    internships: ['Framer Product Design Intern', 'Linear UI Engineering Intern']
  },
  {
    code: 'ECE',
    name: 'Electronics & Communication Engineering',
    overview: 'Core electronics discipline dedicated to VLSI System Design, Embedded Microcontrollers, Robotics, 5G Telecommunications, and Signal Processing.',
    faculty: [
      { name: 'Dr. Vikram Shah', role: 'Head of Department', area: 'VLSI Circuitry & Microcontrollers' },
      { name: 'Prof. Rajiv Mehta', role: 'Associate Professor', area: 'Embedded Systems & Robotics' }
    ],
    resources: ['VLSI Semiconductor Simulation Lab', 'Embedded Systems & IoT Sandbox'],
    projects: ['Smart IoT Campus Sensor Network', 'Autonomous Drone Navigation Controller'],
    skills: ['Embedded C', 'Verilog', 'ARM Architecture', 'MATLAB', 'Circuitry'],
    videos: ['VLSI Chip Architecture Basics', 'IoT Microcontroller Programming'],
    placements: '92% Placement Rate • Top Package: 32 LPA (Qualcomm)',
    internships: ['Qualcomm VLSI Intern', 'Texas Instruments Systems Intern']
  },
  {
    code: 'EEE',
    name: 'Electrical & Electronics Engineering',
    overview: 'Power grid engineering department developing Smart Renewable Grids, High-Voltage Power Electronics, EV Powertrains, and Automation Controls.',
    faculty: [
      { name: 'Prof. David Miller', role: 'Head of Department', area: 'Renewable Smart Grids' },
      { name: 'Dr. Sunita Patel', role: 'Senior Faculty', area: 'Electric Vehicle Powertrains' }
    ],
    resources: ['Smart Grid Telemetry Lab', 'High Voltage Testing Arena', 'EV Battery Test Bench'],
    projects: ['Solar Energy Smart Storage Optimizer', 'EV Regenerative Braking Simulator'],
    skills: ['PLC Automation', 'Power Electronics', 'Simulink', 'CAD Electrical'],
    videos: ['Smart Grid Energy Storage Systems', 'Electric Vehicle Power Converter Design'],
    placements: '90% Placement Rate • Top Package: 28 LPA (Schneider Electric)',
    internships: ['Tesla Powertrain Intern', 'Siemens Automation Intern']
  },
  {
    code: 'Civil',
    name: 'Civil Engineering',
    overview: 'Structural engineering and urban planning wing building Smart Sustainable Cities, Resilient Bridge Structures, and Environmental Infrastructure.',
    faculty: [
      { name: 'Dr. Anita Roy', role: 'Head of Department', area: 'Structural Engineering & Geometrics' },
      { name: 'Prof. Suresh Kumar', role: 'Urban Design Lead', area: 'Smart Infrastructure & CAD' }
    ],
    resources: ['Soil Mechanics Laboratory', 'Structural Stress Testing Rig', 'GIS Survey Suite'],
    projects: ['Seismic Resilient Skyscraper Framework', 'Smart Urban Drainage System'],
    skills: ['AutoCAD', 'ETABS', 'Revit Structure', 'STAAD Pro', 'GIS Mapping'],
    videos: ['Structural Seismic Analysis with ETABS', 'Smart Infrastructure Master Plan'],
    placements: '88% Placement Rate • Top Package: 24 LPA (L&T Construction)',
    internships: ['L&T Structural Design Intern', 'Bechtel Infrastructure Intern']
  },
  {
    code: 'Mechanical',
    name: 'Mechanical Engineering',
    overview: 'Engineering wing focusing on Automotive Mechanics, CAD/CAM Digital Manufacturing, Thermal Power Systems, Aerospace Dynamics, and Robotics.',
    faculty: [
      { name: 'Prof. Arthur Pendelton', role: 'Head of Department', area: 'CAD/CAM Manufacturing & Automation' },
      { name: 'Dr. Rahul Sharma', role: 'Senior Professor', area: 'Thermal Engineering & Aerodynamics' }
    ],
    resources: ['CNC Automated Workshop', 'Aerodynamic Wind Tunnel', 'Robotics Assembly Sandbox'],
    projects: ['Hyper-Efficient IC Engine Prototype', 'Automated Industrial Robotic Arm'],
    skills: ['SolidWorks', 'ANSYS Workbench', 'CATIA', 'CNC Programming', 'Robotics'],
    videos: ['SolidWorks 3D CAD Modeling', 'Finite Element Analysis in ANSYS'],
    placements: '89% Placement Rate • Top Package: 26 LPA (Tata Motors)',
    internships: ['Tesla Mechanical Intern', 'Boeing Aerospace Manufacturing Intern']
  }
];

const DepartmentsPage = () => {
  const [activeDeptCode, setActiveDeptCode] = useState('CSE');
  const [subTab, setSubTab] = useState('overview');

  const dept = DEPARTMENTS_DATA.find(d => d.code === activeDeptCode) || DEPARTMENTS_DATA[0];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="badge badge-red" style={{ marginBottom: '0.75rem' }}>SGIT Academic Wings</div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 900 }}>Engineering Departments</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Standardized 7 Autonomous Engineering Disciplines</p>
      </div>

      {/* Department Selector Tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
        {DEPARTMENTS_DATA.map((d) => (
          <button
            key={d.code}
            onClick={() => { setActiveDeptCode(d.code); setSubTab('overview'); }}
            className={activeDeptCode === d.code ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
          >
            {d.code} - {d.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Selected Department Overview Banner */}
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-red">{dept.code} Department</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginTop: '0.5rem' }}>{dept.name}</h2>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
            {dept.placements}
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '2rem', overflowX: 'auto' }}>
          {[
            { id: 'overview', label: 'Overview', icon: BookOpen },
            { id: 'faculty', label: 'Faculty', icon: Users },
            { id: 'resources', label: 'Resources', icon: Cpu },
            { id: 'projects', label: 'Projects', icon: FolderGit2 },
            { id: 'skills', label: 'Skills & Roadmaps', icon: Code },
            { id: 'videos', label: 'Lectures', icon: Video },
            { id: 'internships', label: 'Internships', icon: Briefcase }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = subTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 800 : 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  paddingBottom: '0.5rem',
                  borderBottom: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent'
                }}
              >
                <Icon size={16} /> <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sub Tab Contents */}
        {subTab === 'overview' && (
          <div>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
              {dept.overview}
            </p>
            <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Department Placement Overview</h3>
              <div style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>{dept.placements}</div>
            </div>
          </div>
        )}

        {subTab === 'faculty' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {dept.faculty.map((f, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{f.name}</h4>
                <div style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 700 }}>{f.role}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.5rem' }}>Specialization: {f.area}</div>
              </div>
            ))}
          </div>
        )}

        {subTab === 'resources' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {dept.resources.map((r, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Cpu size={20} style={{ color: 'var(--accent-primary)' }} />
                <span style={{ fontWeight: 700 }}>{r}</span>
              </div>
            ))}
          </div>
        )}

        {subTab === 'projects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {dept.projects.map((p, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontWeight: 800, fontSize: '1.05rem' }}>{p}</h4>
                <span className="badge badge-red" style={{ marginTop: '0.5rem' }}>Major Project</span>
              </div>
            ))}
          </div>
        )}

        {subTab === 'skills' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {dept.skills.map((s, i) => (
              <span key={i} className="badge badge-red" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>{s}</span>
            ))}
          </div>
        )}

        {subTab === 'videos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {dept.videos.map((v, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Video size={20} style={{ color: 'var(--accent-primary)' }} />
                <span style={{ fontWeight: 700 }}>{v}</span>
              </div>
            ))}
          </div>
        )}

        {subTab === 'internships' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {dept.internships.map((int, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Briefcase size={20} style={{ color: 'var(--accent-emerald)' }} />
                <span style={{ fontWeight: 700 }}>{int}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentsPage;
