import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { ENETUNREACH } from 'constants';
// import Picture from '../assets/onedollar.svg'
const config = require('../../config.js')
import mapStyles from './mapStyles';


function Map(props) {
    const storesArray = props.StoresInfo
    const [selectedBusiness, setSelectedBusiess] = useState(null)
    console.log('MAP PROPSSS', props.StoresInfo)
    console.log('latttt in Map', Number(props.latitude))
    console.log('longgg n Map', Number(props.longitude))

    return (
        <GoogleMap
            defaultZoom={13}
            defaultCenter={{ lat: 33.9878, lng: 118.4706 }}
            center={{ lat: Number(props.latitude), lng: Number(props.longitude) }}
            defaultOptions={{ styles: mapStyles }}
        >
            {storesArray.map(eachObj => (
                <Marker
                    key={eachObj.id}
                    position={{
                        lat: eachObj.latitude, lng: eachObj.longitude
                    }}
                    onClick={() => {
                        setSelectedBusiess(eachObj);
                    }}
                    icon={{
                        url: eachObj.icon,
                        scaledSize: new window.google.maps.Size(35, 35)
                    }}
                />
            ))}

            {selectedBusiness && (
                <InfoWindow
                    position={{ lat: selectedBusiness.latitude, lng: selectedBusiness.longitude }}
                    onCloseClick={() => {
                        console.log('selected buiness in onclinc is', selectedBusiness)
                        setSelectedBusiess(null);
                    }}
                >
                    <div>
                        <h2>{selectedBusiness.name}</h2>
                        <p>  Price Range : {selectedBusiness.price}<br />
                            {selectedBusiness.location.address1} <br />
                            {selectedBusiness.location.city} {selectedBusiness.location.state}<br />
                            {selectedBusiness.phone}


                        </p>



                    </div></InfoWindow>
            )}
        </GoogleMap>
    );



}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function TestMap(props) {
    console.log('prop.storesinfo in TestMap', props.StoresInfo)
    return (
        <div style={{ width: '700px', height: "700px" }}>
            <WrappedMap
                StoresInfo={props.StoresInfo}
                latitude={props.latitude}
                longitude={props.longitude}
                phone={props.phone}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.googleAPI}`}
                loadingElement={<div style={{ height: "100%", width: "100%" }} />}
                containerElement={<div style={{ height: "100%", width: "100%" }} />}
                mapElement={<div style={{ height: "100%", width: "100%" }} />}
            />
        </div>
    )
}