import React from 'react';
import MapComponent from './MapComponent';
import MarkerDetails from './Path'
import Directions from './Directions';
import RefreshButton from './Refresh';

function MainMap() {
  return (
    <div>
      <RefreshButton />
      <div className="Map" style={{ width: '80vw', height: '80vh' }}>
        <MapComponent zoom={17} />
        <MarkerDetails />
      </div>
    </div>
  );
}

export default MainMap;