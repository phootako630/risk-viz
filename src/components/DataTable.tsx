"use client";
import React, { useState } from "react";
import { DataItem } from "@/app/api/types";

// Define the DataTableProps interface
interface DataTableProps {
    data: DataItem[];
    selectedRow: number | null;
    setSelectedRow: React.Dispatch<React.SetStateAction<number | null>>;
}

// Define the number of items to display per page
const itemsPerPage = 100;

// Function to fetch a specific page of data based on the provided page number and data array
const fetchPage = (page: number, data: DataItem[]): DataItem[] => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return data.slice(startIndex, endIndex);
}

// Define the DataTable component
const DataTable: React.FC<DataTableProps> = ({
    data,
    selectedRow,
    setSelectedRow,
}) => {
    const [filterTerm, setFilterTerm] = useState("");
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [selectedRiskFactor, setSelectedRiskFactor] = useState<string | null>(null);
    const [selectedBusinessCategory, setSelectedBusinessCategory] = useState<string | null>(null);
    const [selectedRiskRating, setSelectedRiskRating] = useState<number | null>(null);

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);

    // Handler function for updating the current page
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    }
return (
    <div className="w-full h-full"></div>
);
}