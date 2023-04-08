import React from 'react';

const RefreshButton = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <button type="button" onClick={handleRefresh}>
      Use Current Location
    </button>
  );
};

export default RefreshButton;