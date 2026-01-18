import { useState } from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { EVENT_TYPES, DEPARTMENTS } from '../../utils/constants';

const EventFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    type: '',
    startDate: '',
    endDate: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      department: '',
      type: '',
      startDate: '',
      endDate: '',
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = () => {
    return (
      filters.search ||
      filters.department ||
      filters.type ||
      filters.startDate ||
      filters.endDate
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search events by title or description..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
        >
          <FiFilter />
          <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
        </button>

        {hasActiveFilters() && (
          <button
            onClick={handleClearFilters}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            <FiX />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          {/* Department Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              name="department"
              value={filters.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            >
              <option value="">All Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Event Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Type
            </label>
            <select
              name="type"
              value={filters.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            >
              <option value="">All Types</option>
              {EVENT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date
            </label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* End Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date
            </label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            />
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-600 font-medium">
            Active Filters:
          </span>
          {filters.search && (
            <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
              Search: {filters.search}
            </span>
          )}
          {filters.department && (
            <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
              {filters.department}
            </span>
          )}
          {filters.type && (
            <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
              {EVENT_TYPES.find((t) => t.value === filters.type)?.label}
            </span>
          )}
          {filters.startDate && (
            <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
              From: {filters.startDate}
            </span>
          )}
          {filters.endDate && (
            <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
              To: {filters.endDate}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default EventFilters;