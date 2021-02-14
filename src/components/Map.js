import React from 'react'
import {TileLayer,MapContainer as LeafletMap} from 'npm'
import './Map.css'
function Map({center,zoom}) {

console.log("center",center);
console.log("zoom",zoom)


    return (
        <div className="map">
         <LeafletMap center={center} zoom={zoom}>
            <TileLayer
             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
         </LeafletMap>
        </div>
    )
}

export default Map
