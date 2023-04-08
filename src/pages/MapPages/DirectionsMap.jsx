import React from 'react';
import Directions from './Directions';
import RefreshButton from './Refresh';

function DirectionMap() {
  return (
    <div>
      <RefreshButton />
      <div className="Map" style={{ width: '80vw', height: '100vh' }}>
        <Directions zoom={17} />
      </div>
    </div>
  );
}

export default DirectionMap;
