import React, { useState } from "react";
import MapBox from "@/components/Map";
import {DataItem} from "@/app/api/types";
import Pagination from "@/components/Pagination";

interface RiskMapProps {
    data: DataItem[];
    selectedDataPoint: SelectedDataPoint | null;
}

interface SelectedDataPoint {
    id: number;
    riskRating: number;
    assetName: string;
    riskFactors: { [key: string]: number };
    year: number;
}
const itemsPerPage = 100;

function fetchPage(page: number, data: DataItem[]): DataItem[] {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return data.slice(startIndex, endIndex);
}

const RiskMap: React.FC<RiskMapProps> = ({ data, selectedDataPoint }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const displayedData = fetchPage(currentPage, data);

    return (
        <div className="w-full h-full">
            <MapBox data={displayedData} />
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default RiskMap;

