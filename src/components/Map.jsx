import React from 'react';
import axios from 'axios';
import sungMap from './SungMap'

const Map = (props) => {
  console.log('coord in Map lat: ', props.latitude)

  return (
    <div id="map">
      <iframe 
        width="500" 
        height="400" 
        // #12 before ${props.venueLatitude} in src link specifies zoom (smaller number = less zoom)
        src={`https://api.maptiler.com/maps/hybrid/?key=OeKji8TvwQYbzy8G5Pda#12/${props.latitude}/${props.longitude}/`}>
      </iframe>
    </div>
  )
}

export default Map;