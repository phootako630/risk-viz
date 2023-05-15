"use client";
import React, { useState } from "react";
import { DataItem } from "@/app/api/types";
import Pagination from "@/components/Pagination";
import {Column, useTable} from "react-table";

// Define the DataTableProps interface
interface DataTableProps {
    data: DataItem[];
    selectedRow: number | null;
    setSelectedRow: React.Dispatch<React.SetStateAction<number | null>>;
}
// ColumnWithAccessor interface
type ColumnWithAccessor<T extends Record<string, unknown>> = {
    Header: string;
    accessor: keyof T | ((row: T) => string);
    Cell?: (cell: { value: any }) => JSX.Element;
};

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
    const columns: ColumnWithAccessor<DataItem>[] = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Asset Name',
                accessor: 'assetName',
            },
            {
                Header: 'Lat',
                accessor: 'lat',
            },
            {
                Header: 'Long',
                accessor: 'long',
            },
            {
                Header: 'Business Category',
                accessor: 'businessCategory',
            },
            {
                Header: 'Risk Rating',
                accessor: 'riskRating',
            },
            {
                Header: 'Risk Factors',
                accessor: 'riskFactors',
                Cell: ({ value }) => {
                    return Object.entries(value).map(
                        ([factor, val], index) => (
                            <div key={index}>
                                {factor}: {val}
                            </div>
                        )
                    )
                }
            },
            {
                Header: 'Year',
                accessor: 'year',
            },
        ],
        []
    );


    // Handler function for updating the current page
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    }
    // Handler functions for updating filter values
    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterTerm(event.target.value);
    }
    // Handler function for updating year filter values
    const handleYearFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(event.target.value ? parseInt(event.target.value) : null);
    }
    // Handler for business category filter
    const handleBusinessCategoryFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBusinessCategory(event.target.value ? event.target.value : null);
    };
    // Handler for risk rating filter
    const handleRiskRatingFilter = (event: React.ChangeEvent<HTMLSelectElement>) =>
        setSelectedRiskRating(event.target.value ? parseFloat(event.target.value) : null);
    // Handler for risk factor filter
    const handleRiskFactorFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRiskFactor(event.target.value ? event.target.value : null);
    };

    // Filter the data based on the current filter term
    const filteredData = data.filter((item) => {
        const matchedFilterTerm = !filterTerm || item.assetName
            .toLowerCase()
            .includes(filterTerm.toLowerCase());

        // Filter by year
        const matchedYear = !selectedYear || item.year === selectedYear;

        // Filter by risk factor
        const matchedRiskFactor = !selectedRiskFactor || item.riskFactors.hasOwnProperty(selectedRiskFactor);


        // Filter by business category
        const matchedBusinessCategory = !selectedBusinessCategory || item.businessCategory === selectedBusinessCategory;

        // Filter by risk rating
        const matchedRiskRating = !selectedRiskRating || item.riskRating === selectedRiskRating;

        return (matchedFilterTerm
            && matchedYear
            && matchedRiskFactor
            && matchedBusinessCategory
            && matchedRiskRating);

    });
    // Calculate the start and end index of the items to display on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // The total amount of filtered data need to be displayed
    const totalFilteredData = filteredData.slice(startIndex, endIndex);
    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<DataItem>({columns, data: totalFilteredData  });
return (
    <div className="w-full h-full">
        <input
            type="text"
            placeholder={"Search by asset name, business category, or risk factor"}
            className="w-full h-10 px-3 mb-5 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            onChange={handleFilter}
        />
        <div className="flex flex-row justify-between mb-5">
        <select onChange={handleRiskFactorFilter} className="border p-2 mb-4">
            <option value="">All Risk Factor</option>
            <option value="Earthquake">Earthquake</option>
            <option value="Flood">Flooding</option>
            <option value="Wildfire">Wildfire</option>
            <option value="Extreme cold">Extreme cold</option>
            <option value="Extreme heat">Extreme heat</option>
            <option value="Hurricane">Hurricane</option>
            <option value="Tornado">Tornado</option>
            <option value="Tsunami">Tsunami</option>
            <option value="Volcano">Volcano</option>
            <option value="Drought">Drought</option>
            <option value="Sea level rise">Sea level rise</option>
        </select>
        <select onChange={handleBusinessCategoryFilter} className="border p-2 mb-4">
            <option value="">All Business Category</option>
            <option value="Energy">Energy</option>
            <option value="Technology">Technology</option>
            <option value="Retail">Retail</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
        </select>
            <select onChange={handleRiskRatingFilter} className="border p-2 mb-4">
                <option value="">All Risk Ratings</option>
                <option value="0">0</option>
                <option value="0.1">0.1</option>
                <option value="0.2">0.2</option>
                <option value="0.3">0.3</option>
                <option value="0.4">0.4</option>
                <option value="0.5">0.5</option>
                <option value="0.6">0.6</option>
                <option value="0.7">0.7</option>
                <option value="0.8">0.8</option>
                <option value="0.9">0.9</option>
                <option value="1">1</option>
            </select>
        <select onChange={handleYearFilter} className="border p-2 mb-4">
            <option value="">All Years</option>
            <option value="2030">2030</option>
            <option value="2040">2040</option>
            <option value="2050">2050</option>
            <option value="2060">2060</option>
            <option value="2070">2070</option>
        </select>
            <div className="flex flex-row justify-between mb-5">
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange} />
             </div>
    </div>
        <table {...getTableProps()} className="w-full text-left border-collapse">
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()} className="border p-2">{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row);
                return (
                    <tr
                        {...row.getRowProps()}
                        onClick={() => setSelectedRow(row.original.id)}
                        className={
                            row.original.id === selectedRow
                                ? "bg-blue-100"
                                : i % 2 === 0
                                    ? "bg-gray-50"
                                    : ""
                        }
                    >
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()} className="border p-2">{cell.render('Cell')}</td>
                        })}
                    </tr>
                );
            })}
            </tbody>
        </table>
    </div>
        );
};

export default DataTable;
