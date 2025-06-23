import React from 'react';

const AccountantDashboard = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <iframe
        src="https://vita-accountant-control-hub.vercel.app"
        title="Vitalvida Accountant Control Hub"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default AccountantDashboard;
