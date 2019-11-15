import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VenueDetails = (props) => {

  const [isFavorite, toggleFavorite] = useState(false);

  function checkFavorites() {
    console.log('checking favs');
    axios.get(`/dbRouter/favorites/${props.venue_id}`)
      .then(res => toggleFavorite(res.data.isFavorite))
      .catch(err => console.log(err));
  }

  function addFavorite(e) {
    axios.post(`/dbRouter/addFavorite/${props.venue_id}`, { venueId: props.venue_id, venueName: props.venueName})
      .then(res => toggleFavorite(res.data.isFavorite))
      .catch(err => console.log('Err: ', err));
  }

  function removeFavorite(e) {
    axios.post(`/dbRouter/removeFavorite/${props.venue_id}`)
    .then(res => toggleFavorite(res.data.isFavorite))
    .catch(err => console.log('Err: ', err));
}

  useEffect(checkFavorites, []);

  return (
    <div>
      <h2 className="venue-name">
        {props.venueName}
        
      </h2>
      <img className="specific-venue-image" src={props.venueImage} />
      <div id="specific-venue-details">
        {props.venueLocation.address1}<br />
        {props.venueLocation.city}, {props.venueLocation.state} {props.venueLocation.zip_code}<br />
        {props.venuePhone}<br />
        {props.venueUrl}
        { isFavorite ? 
        <p className='favorite' onClick={removeFavorite}>Remove favorite <span className='star'>⭑</span></p> :
        <p className='favorite' onClick={addFavorite}>Add favorite <span className='star'>✩</span> </p>
        }
      </div>
    </div>
  );
}

export default VenueDetails;