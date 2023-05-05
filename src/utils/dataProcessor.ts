type RiskRating = number;

export type MarkerData = {
    lat: number;
    lng: number;
    riskRating: number;
    assetName: string;
    businessCategory: string;
};

export const getMarkersByDecade = async (decade: number) => {
    const response = await fetch('/api/sheet-data');
    const data = await response.json();
    //console.log('Data from /api/sheet-data:', data);
    //console.log("getMarkersByDecade - Received data:", data);
    // Filter data based on the exact decade value
    const filteredData = data.filter(
        (entry: any) => entry.year === decade
    );
    console.log("getMarkersByDecade - Filtered data:", filteredData);
    //console.log('Filtered data:', filteredData);
    const markers: MarkerData[] = filteredData.map((entry: any) => ({
        lat: entry.lat,
        lng: entry.lng,
        riskRating: entry.riskRating,
        assetName: entry.assetName, // Add this property
        businessCategory: entry.businessCategory, // Add this property
    }));

    console.log('Markers:', markers);

    return markers;
};
