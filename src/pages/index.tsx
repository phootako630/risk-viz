import { useState, useEffect } from 'react';
import { MarkerData, getMarkersByDecade } from '@/utils/dataProcessor';
import Map from '../components/Map';
import DecadeSelector from '../components/DecadeSelector';

const IndexPage = () => {
    const [markers, setMarkers] = useState<MarkerData[]>([]);

    const handleDecadeChange = async (decade: number) => {
        //console.log('Decade changed:', decade);
        const newMarkers = await getMarkersByDecade(decade);
        console.log('New markers:', newMarkers);
        setMarkers(newMarkers);
    };

    useEffect(() => {
        handleDecadeChange(2030);
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl text-center my-4">Climate Risk Map</h1>
            <DecadeSelector onDecadeChange={handleDecadeChange} />
            <Map markers={markers} />
        </div>
    );
};

export default IndexPage;
