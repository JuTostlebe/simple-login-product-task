'use client';
import { useState } from 'react';

interface FilterBarProps {
  onFilterChange: (filters: Filters) => void;
}

export interface Filters {
  search: string;
  dietaryInfo: string[];
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    dietaryInfo: []
  });

  const handleChange = (type: keyof Filters, value: string | string[]) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="mb-6 p-4 bg-gray-800 rounded-lg">
      <input
        type="text"
        placeholder="Etsi tuotteista..."
        className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
        onChange={(e) => handleChange('search', e.target.value)}
      />
    </div>
  );
}