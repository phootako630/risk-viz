import React from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <div>{text}</div>;

const Map = ({ data, selectedDecade }) => {
    const defaultProps = {
        center: {
            lat: 0,
            lng: 0,
        },
        zoom: 1,
    };

    const filteredData = data.filter((item) => item.Year === selectedDecade);

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                {filteredData.map((item, index) => (
                    <Marker
                        key={index}
                        lat={item.Lat}
                        lng={item.Long}
                        text={item['Asset Name']}
                    />
                ))}
            </GoogleMapReact>
        </div>
    );
};

export default Map;
