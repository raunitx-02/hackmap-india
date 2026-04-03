import { Search, Filter, X } from 'lucide-react';
import { useState } from 'react';

const FilterBar = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMode, setSelectedMode] = useState('all');
  const [selectedState, setSelectedState] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const modes = ['all', 'online', 'offline', 'hybrid'];
  const states = [
    'All States', 'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat',
    'West Bengal', 'Rajasthan', 'Uttar Pradesh', 'Telangana', 'Kerala'
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onFilterChange({ searchTerm: e.target.value, mode: selectedMode, state: selectedState });
  };

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
    onFilterChange({ searchTerm, mode, state: selectedState });
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    onFilterChange({ searchTerm, mode: selectedMode, state: e.target.value });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedMode('all');
    setSelectedState('');
    onFilterChange({ searchTerm: '', mode: 'all', state: '' });
  };

  return (
    <div className="bg-[#1E293B] p-6 rounded-lg mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search hackathons..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-3 bg-[#0A0E27] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
        />
      </div>

      {/* Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 text-gray-300 hover:text-white transition mb-4"
      >
        <Filter className="w-4 h-4" />
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      {/* Filters */}
      {showFilters && (
        <div className="space-y-4">
          {/* Mode Filter */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Mode</label>
            <div className="flex flex-wrap gap-2">
              {modes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleModeChange(mode)}
                  className={`px-4 py-2 rounded-lg capitalize transition ${
                    selectedMode === mode
                      ? 'bg-[#3B82F6] text-white'
                      : 'bg-[#334155] text-gray-300 hover:bg-[#475569]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* State Filter */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">State</label>
            <select
              value={selectedState}
              onChange={handleStateChange}
              className="w-full px-4 py-3 bg-[#0A0E27] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            >
              {states.map((state) => (
                <option key={state} value={state === 'All States' ? '' : state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition"
          >
            <X className="w-4 h-4" />
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
