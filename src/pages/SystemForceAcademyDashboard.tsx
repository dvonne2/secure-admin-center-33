
import React, { useState } from 'react';
import { CurriculumNavigation } from '@/components/academy/CurriculumNavigation';
import { CurriculumContent } from '@/components/academy/CurriculumContent';
import { FontLoader } from '@/components/academy/FontLoader';

export default function SystemForceAcademyDashboard() {
  const [activeSection, setActiveSection] = useState('foundation-1');

  return (
    <>
      <FontLoader />
      <div className="flex h-screen bg-white">
        <CurriculumNavigation />
        <CurriculumContent activeSection={activeSection} />
      </div>
    </>
  );
}
