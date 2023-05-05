import { useEffect, useState } from 'react';
import Papa from 'papaparse';

export const useCSVData = (csvFile) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        Papa.parse(csvFile, {
            download: true,
            header: true,
            complete: (results) => {
                setData(results.data);
            }
        });
    }, [csvFile]);

    return data;
};
