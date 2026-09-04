import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'What is SGIT AUTONOMOUS Platform?',
      answer: 'SGIT AUTONOMOUS is an integrated career management, skill enhancement, and academic LMS platform tailored for engineering scholars at SGIT AUTONOMOUS college.'
    },
    {
      question: 'How does the AI Resume Builder generate vector PDF files?',
      answer: 'Our built-in rendering engine parses client-side HTML DOM elements directly into pixel-perfect PDF vector layouts using html2pdf and canvas engines, ensuring crisp print readability without third-party watermarks.'
    },
    {
      question: 'How accurate is the ATS Resume Checker score?',
      answer: 'The ATS engine analyzes exact tech keyword frequencies, missing skills relative to tier-1 job listings, section ordering, bullet point metrics, and parser readability algorithms to give an accurate 0-100 match percentage.'
    },
    {
      question: 'Can students participate in multiple workshops simultaneously?',
      answer: 'Yes! Students can register for unlimited workshops. Recorded live sessions and slide decks are permanently accessible inside the Student Learning Portal.'
    },
    {
      question: 'What are the access privileges for Admin vs Super Admin accounts?',
      answer: 'Admins can manage student rosters, publish workshops, oversee projects, and broadcast notifications. Super Admins have complete governance over platform content, departments, user roles, audit logs, and system health.'
    }
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="badge badge-red" style={{ marginBottom: '0.75rem' }}>Knowledge Base</div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800 }}>Frequently Asked Questions</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Find answers to common platform, AI tools, and governance queries.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="glass-panel" style={{ overflow: 'hidden', cursor: 'pointer' }} onClick={() => setOpenIndex(isOpen ? -1 : index)}>
              <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: '1.05rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <HelpCircle size={20} style={{ color: 'var(--accent-primary)' }} />
                  {faq.question}
                </span>
                <ChevronDown size={20} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'var(--transition-fast)' }} />
              </div>
              {isOpen && (
                <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQPage;
