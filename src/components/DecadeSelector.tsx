
import React from 'react';
import Select from 'react-select';

const options = [
    { value: '2030', label: '2030' },
    { value: '2040', label: '2040' },
    { value: '2050', label: '2050' },
    { value: '2060', label: '2060' },
    { value: '2070', label: '2070' },
];

const DecadeSelector = ({ setSelectedDecade }) => (
    <Select
        options={options}
        onChange={(selectedOption) => setSelectedDecade(selectedOption.value)}
    />
);

export default DecadeSelector;
