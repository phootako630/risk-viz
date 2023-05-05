import React, { useState } from 'react';
import { MarkerData } from '@/utils/dataProcessor';

type DataTableProps = {
    year: number;
    data: MarkerData[];
};

const DataTable: React.FC<DataTableProps> = ({ year, data }) => {
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [filter, setFilter] = useState<string>('');

    // sorting and filtering logic goes here
    const sortByColumn = (a: MarkerData, b: MarkerData) => {
        if (!sortColumn) return 0;

        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    };

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const filterData = (row: MarkerData) => {
        if (!filter) return true;

        const filterLowerCase = filter.toLowerCase();
        const riskFactors = JSON.parse(row.riskFactors);

        return Object.keys(riskFactors).some(
            (key) => key.toLowerCase().includes(filterLowerCase) && riskFactors[key] > 0
        );
    };

    return (
        <div>
            <h2 className="text-2xl my-4">Data Table</h2>
            <input
                type="text"
                placeholder="Filter by risk factors"
                onChange={(e) => setFilter(e.target.value)}
                className="border p-2 rounded mb-4"
            />
            <table className="w-full table-auto">
                <thead>
                <tr>
                    {[
                        'name',
                        'latitude',
                        'longitude',
                        'industry',
                        'totalRisk',
                        'riskFactors',
                        'year',
                    ].map((column) => (
                        <th
                            key={column}
                            onClick={() => handleSort(column)}
                            className="border px-4 py-2 cursor-pointer"
                        >
                            {column} {sortColumn === column && (sortOrder === 'asc' ? '▲' : '▼')}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data
                    .sort(sortByColumn)
                    .filter(filterData)
                    .map((row: MarkerData, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{row.assetName}</td>
                            <td className="border px-4 py-2">{row.lat}</td>
                            <td className="border px-4 py-2">{row.lng}</td>
                            <td className="border px-4 py-2">{row.businessCategory}</td>
                            <td className="border px-4 py-2">{row.riskRating}</td>
                            <td className="border px-4 py-2">{JSON.stringify(row.riskFactors)}</td>
                            <td className="border px-4 py-2">{row.year}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;