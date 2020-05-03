import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import { compose, withProps } from 'recompose';
import './maps.css';

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing,places&key=${process.env.REACT_APP_MAP_API_KEY}`,
    loadingElement: <div style={{ height: `100%` }}>Loading..</div>,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    defaultCenter: { lat: 30.04943, lng: 31.23095 }
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap center={props.center || props.defaultCenter} defaultZoom={12}>
      <Marker
        draggable={props.draggable}
        onDragEnd={props.onDragEnd}
        position={props.center || props.defaultCenter}
        ref={props.markerRef}
      />
    </GoogleMap>
  );
});
