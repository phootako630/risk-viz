// src/components/DataTable.tsx

import React, { useMemo } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';

function DefaultColumnFilter({
                                 column: { filterValue, preFilteredRows, setFilter },
                             }) {
    const count = preFilteredRows.length;

    return (
        <input
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
        />
    );
}

interface DataTableProps {
    data: any[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
    const columns = useMemo(
        () => [
            {
                Header: 'Asset Name',
                accessor: 'asset_name',
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
                accessor: 'business_category',
            },
            {
                Header: 'Risk Rating',
                accessor: 'risk_rating',
            },
            {
                Header: 'Risk Factors',
                accessor: 'risk_factors',
            },
            {
                Header: 'Year',
                accessor: 'year',
            },
        ],
        []
    );

    const defaultColumn = useMemo(
        () => ({
            Filter: DefaultColumnFilter,
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data, defaultColumn }, useFilters, useSortBy);

    return (
        <table {...getTableProps()} style={{ width: '100%', textAlign: 'left' }}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, i) => (
                        <th key={i} {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                            <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
                            <div>{column.canFilter ? column.render('Filter') : null}</div>
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row);
                return (
                    <tr key={i} {...row.getRowProps()}>
                        {row.cells.map((cell, j) => {
                            return <td key={j} {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                        })}
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};

export default DataTable;
