import React, { useEffect } from 'react';
import VenueDetails from '../components/VenueDetails.jsx';
import WaitTimesDisplay from '../components/WaitTimesDisplay.jsx';
import '../css/VenuePage.css'
import VenueMap from '../components/VenueMap.jsx'
import Button from 'react-bootstrap/Button';


const VenueContainer = (props) => {

  
  // render map and wait times
  console.log('props in venucontainer', props.searchResults)
  return (
    <div>
      <section className="search-bar">

        {/* <img id="logo-pic-venue" src="https://image.flaticon.com/icons/png/512/876/876569.png"/> */}
        <input type="input" id="searchInput" placeholder="Business or Category" onChange={props.setSearchInput} />
        <input type="input" id="location" placeholder="Location" onChange={props.setLocation} />
        <input type="button" id="searchButton" onClick={props.search} />
      </section>
      <div id="venue-page">
        <div id="venue-details-column">
          <VenueDetails
            venueName={props.venueName}
            venueUrl={props.venueUrl}
            venueImage={props.venueImage}
            venueLocation={props.venueLocation}
            venuePhone={props.venuePhone}
          />

          <WaitTimesDisplay 
            venueId = { props.venueId }
            venueWaitTimeList = { props.venueWaitTimeList }
            addWaitTime = { props.addWaitTime }
            setWaitTime = { props.setWaitTime }
            updateWaitList = {props.updateWaitList}

          />
        </div>

        <div id="map">
          <VenueMap 
            StoresInfo = {props.searchResults}
            latitude={props.latitude} 
            longitude={props.longitude}

          />
            

        </div>
      </div>
    </div>
  )
}

export default VenueContainer;