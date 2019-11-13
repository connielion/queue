import React, {useState} from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps';
const config = require('../../config.js')

function Map(props) {
    const StoresArray = props.StoresInfo
    console.log('MAP PROPSSS',  props.StoresInfo)
    console.log('latttt in Map',  Number(props.latitude))
    console.log('longgg n Map',  Number(props.longitude))
    
        return(
            <GoogleMap
                defaultZoom = {17}
                defaultCenter= {{lat : 33.9878, lng: 118.4706}}
                center= {{lat : Number(props.latitude), lng: Number(props.longitude)}}
            >
                {/* <Marker
                    key={'test'}
                    position={{lat : 33.993118, lng: -118.456200}}
                /> */}
                
            
            </GoogleMap>
        );
     

    
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function TestMap(props) {
    // console.log('wtf the', typeof(props.test))
    return (
        <div style={{width: '500px', height: "500px"}}>
            <WrappedMap
                StoresInfo = {props.StoresInfo}
                latitude = {props.latitude}
                longitude = {props.longitude}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.googleAPI}`}
                loadingElement={<div style={{height: "100%", width: "100%"}}/>}
                containerElement={<div style={{height:"100%", width: "100%"}}/>}
                mapElement={<div style={{height:"100%", width: "100%"}}/>}
            />
        </div>
    )
}