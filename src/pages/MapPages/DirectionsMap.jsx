import React from 'react';
import Directions from './Directions';

function DirectionMap() {
  return (

      <div className="Map" style={{ width: '80vw', height: '100vh' }}>
        <Directions zoom={17} />
      </div>

  );
}

export default DirectionMap;
