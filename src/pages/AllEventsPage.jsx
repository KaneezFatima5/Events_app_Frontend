import { useState, useEffect } from 'react';
import { eventsAPI } from '../api/events.api';
import EventCards from '../components/events/EventCard';
import EventFilters from '../components/events/EventFilters';
import Loading from '../components/common/Loading';
import { FiCalendar } from 'react-icons/fi';

const AllEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      // Convert date strings to ISO format if present
      const queryParams = { ...filters };
      if (queryParams.startDate) {
        queryParams.startDate = new Date(queryParams.startDate).toISOString();
      }
      if (queryParams.endDate) {
        queryParams.endDate = new Date(queryParams.endDate).toISOString();
      }

      const response = await eventsAPI.getAllEvents(queryParams);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            All Campus Events
          </h1>
          <p className="text-gray-600 text-lg">
            Discover and explore events happening across campus
          </p>
        </div>

        {/* Filters */}
        <EventFilters onFilterChange={handleFilterChange} />

        {/* Events Grid */}
        {loading ? (
          <Loading />
        ) : events.length > 0 ? (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                Found <span className="font-semibold">{events.length}</span>{' '}
                event{events.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCards key={event.id} event={event} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <FiCalendar className="text-gray-400 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No events found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEventsPage;