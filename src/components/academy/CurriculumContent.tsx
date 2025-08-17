
import React from 'react';

interface CurriculumContentProps {
  activeSection: string;
}

const contentData: Record<string, { title: string; description: string; details: string[] }> = {
  'foundation-1': {
    title: 'Foundation 1 – Mindset',
    description: 'Building the foundational mindset required for business excellence.',
    details: [
      'Understanding business psychology',
      'Developing growth mindset',
      'Leadership fundamentals',
      'Decision-making frameworks'
    ]
  },
  'foundation-2a': {
    title: 'Foundation 2A – Queen Bee Role',
    description: 'Learning the central coordination role in business operations.',
    details: [
      'Central coordination principles',
      'Resource allocation strategies',
      'Team leadership dynamics',
      'Performance optimization'
    ]
  },
  'foundation-2b': {
    title: 'Foundation 2B – Core BMC',
    description: 'Mastering the Business Model Canvas fundamentals.',
    details: [
      'Value proposition design',
      'Customer segment analysis',
      'Revenue stream optimization',
      'Key partnership development'
    ]
  },
  'specializations': {
    title: 'Department Specializations',
    description: 'Choose your specialization path based on your career goals.',
    details: [
      'Marketing & Sales',
      'Operations & Logistics',
      'Finance & Accounting',
      'Human Resources',
      'Technology & Innovation'
    ]
  },
  'final-exam': {
    title: 'Final Exam – 360° Simulation',
    description: 'A comprehensive business crisis simulation to test your readiness.',
    details: [
      'Cross-department collaboration',
      'Crisis management protocols',
      'Real-time decision making',
      'Performance under pressure'
    ]
  },
  'certificate': {
    title: 'Certificate',
    description: 'Recognition of your achievement and business readiness.',
    details: [
      'Industry recognized certification',
      'Digital badge for LinkedIn',
      'Alumni network access',
      'Continuing education opportunities'
    ]
  }
};

export function CurriculumContent({ activeSection }: CurriculumContentProps) {
  const content = contentData[activeSection];

  if (!content) {
    return (
      <div className="flex-1 p-8 bg-white">
        <div className="text-center text-gray-500">
          Select a curriculum section to view details
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-white">
      <div className="max-w-4xl">
        <h1 
          className="text-black mb-4"
          style={{ 
            fontFamily: '"Playfair Display", serif', 
            fontWeight: 700, 
            fontSize: '2.5rem'
          }}
        >
          {content.title}
        </h1>
        
        <p 
          className="text-gray-700 mb-8 text-lg leading-relaxed"
          style={{ fontFamily: '"Montserrat", sans-serif' }}
        >
          {content.description}
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 
            className="text-black mb-4"
            style={{ 
              fontFamily: '"Montserrat", sans-serif', 
              fontWeight: 600, 
              fontSize: '1.25rem'
            }}
          >
            Key Learning Areas:
          </h3>
          
          <ul className="space-y-3">
            {content.details.map((detail, index) => (
              <li 
                key={index}
                className="flex items-center text-gray-700"
                style={{ fontFamily: '"Montserrat", sans-serif' }}
              >
                <div className="w-2 h-2 bg-[#8C1515] rounded-full mr-3"></div>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
