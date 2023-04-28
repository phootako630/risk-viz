import React from 'react';

interface DecadeSelectorProps {
    onDecadeChange: (decade: number) => void;
}

const DecadeSelector: React.FC<DecadeSelectorProps> = ({ onDecadeChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const decade = parseInt(event.target.value, 10);
        onDecadeChange(decade);
    };

    return (
        <div className="w-full flex justify-center mt-4">
            <label htmlFor="decade" className="mr-2">
                Select Decade:
            </label>
            <select
                name="decade"
                id="decade"
                className="border-2 border-gray-300 rounded-md p-1"
                onChange={handleChange}
            >
                <option value={2030}>2030s</option> {/* Corrected values */}
                <option value={2040}>2040s</option>
                <option value={2050}>2050s</option>
                <option value={2060}>2060s</option>
                <option value={2070}>2070s</option>
            </select>
        </div>
    );
};

export default DecadeSelector;
