import React from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindow } from '@react-google-maps/api';
import { MarkerData } from '@/utils/dataProcessor';

const containerStyle = {
    width: '100%',
    height: '600px',
};

const defaultCenter = {
    lat: 39.8283,
    lng: -98.5795,
};

interface MapProps {
    markers: MarkerData[];
}

const Map: React.FC<MapProps> = ({ markers }) => {
    const [selectedMarker, setSelectedMarker] = React.useState<MarkerData | null>(null);

    // Generate a unique key based on the length of the markers array.
    // This key will change whenever the number of markers changes.
    const mapKey = markers.length;

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
            <GoogleMap
                key={mapKey} // Add the unique key here
                mapContainerStyle={containerStyle}
                center={defaultCenter}
                zoom={4}
            >
                {markers.map((marker, index) => {
                    // Log the lat and lng values for each marker
                    //console.log(`Marker ${index}: lat=${marker.lat}, lng=${marker.lng}`);

                    return (
                        <MarkerF
                            key={index}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            onClick={() => setSelectedMarker(marker)}
                        />
                    );
                })}

                {selectedMarker && (
                    <InfoWindow
                        position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                        onCloseClick={() => setSelectedMarker(null)}
                    >
                        <div>
                            <h4>{selectedMarker.assetName}</h4>
                            <p>{selectedMarker.businessCategory}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};


export default React.memo(Map);

