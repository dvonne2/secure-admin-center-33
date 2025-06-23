import React from 'react';

const InventoryDashboard = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <iframe
        src="https://www.vitalvida.name.ng/inventory"
        title="Vitalvida Inventory"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 'none' }}
        allowFullScreen
      />
    </div>
  );
};

export default InventoryDashboard;