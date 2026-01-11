// // src/pages/Events.jsx - Clean and fast!
// import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { eventsAPI } from '../api/events';

// export default function Events() {
//   const [filters, setFilters] = useState({});
  
//   const { data: events, isLoading } = useQuery({
//     queryKey: ['events', filters],
//     queryFn: () => eventsAPI.getEvents(filters)
//   });

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Campus Events</h1>
      
//       {/* Filter bar */}
//       <FilterBar onChange={setFilters} />
      
//       {/* Events grid */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : (
//           events?.map(event => (
//             <EventCard key={event.id} event={event} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPlus, FiCalendar } from 'react-icons/fi';
import { eventsAPI } from '../api/events.api';
import EventCard from '../components/events/EventCard';
import Loading from '../components/common/loading';
import { useAuth } from '../context/AuthContext';

const MyEventsPage = () => {
  const navigate = useNavigate();
  const { isOrganizer } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if user is not an organizer
    if (!isOrganizer()) {
      navigate('/');
      return;
    }
    fetchMyEvents();
  }, [isOrganizer, navigate]);

  const fetchMyEvents = async () => {
    try {
      const response = await eventsAPI.getMyEvents();
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching my events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              My Events
            </h1>
            <p className="text-gray-600 text-lg">
              Manage all your organized events
            </p>
          </div>
          <Link
            to="/create-event"
            className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
          >
            <FiPlus />
            <span>Create Event</span>
          </Link>
        </div>

        {/* Events Grid */}
        {loading ? (
          <Loading />
        ) : events.length > 0 ? (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                You have <span className="font-semibold">{events.length}</span>{' '}
                event{events.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <FiCalendar className="text-gray-400 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No events yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start by creating your first event
            </p>
            <Link
              to="/create-event"
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
            >
              <FiPlus />
              <span>Create Event</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEventsPage;