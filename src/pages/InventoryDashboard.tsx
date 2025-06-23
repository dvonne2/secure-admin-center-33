import React from 'react';

const InventoryDashboard = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <iframe
        src="https://vitalvida-inventory-command.vercel.app"
        title="Vitalvida Inventory Command"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default InventoryDashboard;
