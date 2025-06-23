import React from 'react';

const InvestorDashboard = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <iframe
        src="https://vitalvida-investor-cockpit.vercel.app"
        title="Vitalvida Investor Cockpit"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default InvestorDashboard;
