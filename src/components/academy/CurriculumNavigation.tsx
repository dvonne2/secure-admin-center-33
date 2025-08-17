
import React, { useState } from 'react';
import { Database, Star, Square, Activity, Clock, Award, ChevronRight } from 'lucide-react';

interface NavigationItem {
  id: string;
  title: string;
  subtext?: string;
  icon: React.ComponentType<any>;
  expandable?: boolean;
}

const navigationItems: NavigationItem[] = [
  {
    id: 'foundation-1',
    title: 'Foundation 1 – Mindset',
    icon: Database,
    expandable: true
  },
  {
    id: 'foundation-2a',
    title: 'Foundation 2A – Queen Bee Role',
    icon: Star,
    expandable: true
  },
  {
    id: 'foundation-2b',
    title: 'Foundation 2B – Core BMC',
    icon: Square,
    expandable: true
  },
  {
    id: 'specializations',
    title: 'Department Specializations',
    icon: Activity,
    expandable: false
  },
  {
    id: 'final-exam',
    title: 'Final Exam – 360° Simulation',
    subtext: 'A cross-department business crisis where candidates must prove readiness.',
    icon: Clock,
    expandable: false
  },
  {
    id: 'certificate',
    title: 'Certificate',
    subtext: 'Awarded to candidates that pass with a score of 80/100 or above.',
    icon: Award,
    expandable: false
  }
];

export function CurriculumNavigation() {
  const [activeItem, setActiveItem] = useState<string>('foundation-1');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['foundation-1']));

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
  };

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <nav className="navigation bg-white border-r border-gray-200 h-screen" style={{ width: '350px' }}>
      <div className="px-6 py-8">
        <h2 className="nav-title text-black" style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: '1.75rem' }}>
          Curriculum Flow
        </h2>
        
        <ul className="nav-items mt-8 space-y-5">
          {navigationItems.map((item) => {
            const isActive = activeItem === item.id;
            const isExpanded = expandedItems.has(item.id);
            const IconComponent = item.icon;
            
            return (
              <li key={item.id} className="nav-item">
                <div
                  className={`nav-link flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:bg-gray-50 ${
                    isActive ? 'text-[#8C1515]' : 'text-black'
                  }`}
                  onClick={() => handleItemClick(item.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Navigate to ${item.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleItemClick(item.id);
                    }
                  }}
                >
                  <div className="flex items-center flex-1">
                    <IconComponent 
                      className={`nav-icon mr-3 transition-colors duration-200 ${
                        isActive ? 'text-[#8C1515]' : 'text-black hover:text-[#8C1515]'
                      }`}
                      size={20}
                      strokeWidth={1.5}
                    />
                    <div className="nav-text">
                      <div 
                        className={`font-medium transition-colors duration-200 ${
                          isActive ? 'text-[#8C1515] underline' : 'text-black'
                        }`}
                        style={{ 
                          fontFamily: '"Montserrat", sans-serif', 
                          fontSize: '0.95rem',
                          textUnderlineOffset: isActive ? '3px' : undefined
                        }}
                      >
                        {item.title}
                      </div>
                      {item.subtext && (
                        <div 
                          className="nav-subtext text-gray-600 italic mt-1"
                          style={{ 
                            fontFamily: '"Montserrat", sans-serif', 
                            fontSize: '0.8rem',
                            fontWeight: 400
                          }}
                        >
                          {item.subtext}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {item.expandable && (
                    <ChevronRight
                      className={`expand-icon ml-2 transition-transform duration-200 ${
                        isExpanded ? 'rotate-90' : ''
                      } ${isActive ? 'text-[#8C1515]' : 'text-black hover:text-[#8C1515]'}`}
                      size={16}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpanded(item.id);
                      }}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
