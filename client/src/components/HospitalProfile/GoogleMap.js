import React, { Fragment } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polygon } from "react-google-maps";
import DrawingManager from "react-google-maps/lib/components/drawing/DrawingManager";
import { compose, withProps } from "recompose";
import "./maps.css";

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing,places&key=AIzaSyA04eKWIFgJBhtmuR06hie9kwpOZGEOvAA`,
    loadingElement: <div style={{ height: `100%` }}>Loading..</div>,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    defaultCenter: { lat: 30.04943, lng: 31.23095 },
  }),
  withScriptjs,
  withGoogleMap,
)(props => {
  return (
    <GoogleMap center={props.center || props.defaultCenter} defaultZoom={12}>
      {props.polygon && (
        <Fragment>
          <Polygon
            options={{ fillColor: "green", zIndex: 15 }}
            geodisk
            editable
            draggable
            path={props.value}
            onMouseUp={props.onEdit}
            ref={props.polygonRef}
          />
          <DrawingManager
            defaultDrawingMode="polygon"
            defaultOptions={{
              drawingControlOptions: {
                drawingModes: ["polygon"],
              },
            }}
            onPolygonComplete={props.onDoneDrawing}
          />
        </Fragment>
      )}

      {props.zones ? (
        <Fragment>
          {props.zones.map(zone => {
            const coordinates = zone.coordinates.map(coordinate => ({
              lng: parseFloat(coordinate.lng),
              lat: parseFloat(coordinate.lat),
            }));

            return <Polygon options={{ fillColor: zone.color, zIndex: 1 }} path={coordinates} />;
          })}
        </Fragment>
      ) : (
        <Marker
          draggable={props.draggable}
          onDragEnd={props.onDragEnd}
          position={props.center || props.defaultCenter}
          ref={props.markerRef}
        />
      )}
    </GoogleMap>
  );
});
