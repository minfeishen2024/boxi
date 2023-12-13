'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import mapboxgl from "mapbox-gl";
import { Marker } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { SafeListing } from '../types';

interface MyMapProps {
    data: SafeListing[]
}

const MyMap: React.FC<MyMapProps> = ({
    data
}) => {

    const [map, setMap] = useState<mapboxgl.Map>();
    // const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);

    // React ref to store a reference to the DOM node that will be used
  // as a required parameter `container` when initializing the mapbox-gl
  // will contain `null` by default
    const mapNode = useRef(null);

    const locations = data.map(listing => ({
        latitude: listing.latitude,
        longitude: listing.longitude
    }))


    // const locations = [
    //     { latitude: 39.9613, longitude: -75.21 },
    //     { latitude: 39.9543, longitude: -75.1931 },
    //     { latitude: 39.97, longitude: -75.1892 },
    //     { latitude: 39.958, longitude: -75.2069 },
    //     { latitude: 39.9675, longitude: -75.1875 },
    //     { latitude: 39.9533, longitude: -75.1807 },
    //     { latitude: 39.9535, longitude: -75.1817 },
    //     { latitude: 39.9659, longitude: -75.1998 },
    //     { latitude: 39.9697, longitude: -75.2017 },
    //     { latitude: 39.9671, longitude: -75.1839 }
    // ];

    useEffect(() => {
    const node = mapNode.current;
        // if the window object is not found, that means
        // the component is rendered on the server
        // or the dom node is not initialized, then return early
    if (typeof window === "undefined" || node === null) return;

    const initialCenter: [number, number] = locations.length > 0 && typeof locations[0].longitude === 'number' && typeof locations[0].latitude === 'number'
    ? [locations[0].longitude, locations[0].latitude]
    : [-74.5, 40]; // Fallback coordinates

        // otherwise, create a map instance
    const mapboxMap = new mapboxgl.Map({
      container: node,
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN,
            style: "mapbox://styles/mapbox/streets-v11",
      center: initialCenter,
      zoom: 9,
    });

        // save the map object to React.useState
    setMap(mapboxMap);

    mapboxMap.on('load', () => {
        locations.forEach(location => {
            // Check if both longitude and latitude are numbers
            if (typeof location.longitude === 'number' && typeof location.latitude === 'number') {
                new mapboxgl.Marker({
                    color: "#59745D"
                })
                .setLngLat([location.longitude, location.latitude])
                .addTo(mapboxMap);
            }
        });
    });

    return () => {
      mapboxMap.remove();
    };
  }, []);

  return(
    <div ref={mapNode} style={{ width: "100%", height: "100%" }} />
  )
}

export default MyMap