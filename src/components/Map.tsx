import React, { useState, useEffect, useRef } from "react";
import mapboxgl, { Marker, Popup } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Feature, Point } from "geojson";
import { DataItem } from "@/app/api/types";
import { MapboxGeoJSONFeature } from 'mapbox-gl';

interface MapBoxProps {
    data: DataItem[];
}


// Define the MapBox component
const MapBox: React.FC<MapBoxProps> = ({ data }) => {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markersRef = useRef<Marker[]>([]);
    const [decadeYear, setDecadeYear] = useState(2030);
    let popup: mapboxgl.Popup | null = null;

    // Create and update markers on the map based on the data and decadeYear
    const updateMarkers = () => {
        if (!mapRef.current) return;

        const features: Array<Feature<Point>> = data
            .filter((item: DataItem) => {
                // Filter based on the decadeYear
                if (item.year < decadeYear || item.year >= decadeYear + 10) return false;

                // Filter out invalid latitude and longitude values
                if (
                    item.lat < -90 ||
                    item.lat > 90 ||
                    item.long < -180 ||
                    item.long > 180
                ) {
                    console.warn("Invalid latitude or longitude:", item);
                    return false;
                }
                return true;
            })
            .map((item: DataItem) => {
                const riskColor = item.riskRating < 0.25 ? 'green' : (item.riskRating < 0.5 ? 'orange' : (item.riskRating < 0.75 ? 'red' : ''));
                return {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [item.long, item.lat],
                    },
                    properties: {
                        year: item.year,
                        businessCategory: item.businessCategory,
                        riskColor,
                        assetName: item.assetName,
                        riskRating: item.riskRating,
                    },
                };
            });

        const source = mapRef.current.getSource("markers");
        if (source) {
            (source as mapboxgl.GeoJSONSource).setData({
                type: "FeatureCollection",
                features,
            });
        } else {
            mapRef.current.addSource("markers", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features,
                },
            });

            mapRef.current.addLayer({
                id: "markers",
                type: "circle",
                source: "markers",
                paint: {
                    "circle-radius": 8,
                    "circle-color": ["get", "riskColor"],
                },
            });

            // Add a popup when a marker is clicked
            mapRef.current.on("click", "markers", (e) => {
// ... other code ...
            });

            // Change the cursor style as a UI indicator when hovering over a marker
            mapRef.current.on("mouseenter", "markers", (e) => {
                if (mapRef.current  && e.features && e.features.length > 0) {
                    mapRef.current.getCanvas().style.cursor = "pointer";
                    const feature = e.features[0];
                    if (feature.properties) {
                        const coordinates = feature.geometry.coordinates.slice();
                        const assetName = feature.properties.assetName;
                        const businessCategory = feature.properties.businessCategory;
                        const year = feature.properties.year;
                        const riskRating = feature.properties.riskRating.toFixed(2)

                        // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the popup appears over the copy being pointed to
                        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }
                        const html = `
                        <div 
                        class="text-gray-800"
                        style="color: #333; padding: 10px;">
                            <h3
                            class="text-xl font-semibold mb-2" 
                             style="margin: 0; padding-bottom: 5px; border-bottom: 1px solid #ddd;">${assetName}</h3>
                                <p class="font-medium" style="margin: 5px 0;">Business Category: <strong>${businessCategory}</strong></p>
                                 <p style="margin: 5px 0;">Risk Rating: <strong>${year}</strong></p>
                                <p style="margin: 5px 0;">Risk Rating: <strong>${riskRating}</strong></p>
                        </div>
        `;
                        // Create a new popup and set its coordinates and HTML content, then add it to the map
                        popup = new mapboxgl.Popup()
                            .setLngLat(coordinates)
                            .setHTML(html)
                            .addTo(mapRef.current);
                    }
                }
            });

            mapRef.current.on("mouseleave", "markers", () => {
                if (mapRef.current) {
                    mapRef.current.getCanvas().style.cursor = "";
                    if (popup) {
                        popup.remove();
                        popup = null;
                    }
                }
            });
        }
    };

    // Call updateMarkers when decadeYear or data changes
    useEffect(() => {
        updateMarkers();
    }, [decadeYear, data]);

    // Initialize the map on component mount
    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
        mapRef.current = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/misreableivan/clhanvylz004v01qp083i9z6e",
            center: [-100.746, 46.8797],
            zoom: 3,
        });

        mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

        mapRef.current.addControl(new mapboxgl.FullscreenControl());

        mapRef.current.on('load', () => {
            updateMarkers();
        }); // Update markers once map has finished loading

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, []);

    // Update the decadeYear state when the user selects a different decade
    const handleDecadeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDecadeYear(Number(event.target.value));
    };

    return (
        <div className = "min-h-screen">
            <div className="container mx-auto px-4 py-6">
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="decadeYear">
                        Decade Year:
                    </label>
                    <select
                        id="decadeYear"
                        value={decadeYear}
                        onChange={handleDecadeChange}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        {Array.from({ length: 5 }, (_, i) => 2030 + i * 10).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div
                    id="map"
                    className="w-full h-[600px] rounded-lg shadow relative mapboxgl-map"
                ></div>{/* Add this line to render the map */}
            </div>

        </div>
    );
};

export default MapBox;

