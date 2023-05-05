import React, { useState } from 'react';
import Map from '../components/Map';
import { useCSVData } from '@/utils/useCSVData';
import dynamic from "next/dynamic";

const DecadeSelector = dynamic(() => import('../components/DecadeSelector'), {
    ssr: false,
});
export default function Home() {
    const [selectedDecade, setSelectedDecade] = useState('2030');
    const data = useCSVData('/datasets/data.csv');

    return (
        <div>
            <DecadeSelector setSelectedDecade={setSelectedDecade} />
            <Map data={data} selectedDecade={selectedDecade} />
        </div>
    );
}
