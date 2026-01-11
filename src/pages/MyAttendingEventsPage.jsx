import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar } from 'react-icons/fi';
import { eventsAPI } from '../api/events.api';
import EventCard from '../components/events/EventCard';
import Loading from '../components/common/Loading';
import { useAuth } from '../context/AuthContext';

const MyAttendingEventsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if user is not authenticated
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    fetchMyAttendingEvents();
  }, [isAuthenticated, navigate]);

  const fetchMyAttendingEvents = async () => {
    try {
      // Get event IDs user is attending
      const attendingResponse = await eventsAPI.getMyAttendingEvents();
      const eventIds = attendingResponse.data;

      if (eventIds.length === 0) {
        setEvents([]);
        setLoading(false);
        return;
      }

      // Fetch all events and filter by attending IDs
      const allEventsResponse = await eventsAPI.getAllEvents({});
      const attendingEvents = allEventsResponse.data.filter((event) =>
        eventIds.includes(event.id)
      );

      setEvents(attendingEvents);
    } catch (error) {
      console.error('Error fetching attending events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Attending Events
          </h1>
          <p className="text-gray-600 text-lg">
            Events you're registered to attend
          </p>
        </div>

        {/* Events Grid */}
        {loading ? (
          <Loading />
        ) : events.length > 0 ? (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                You're attending{' '}
                <span className="font-semibold">{events.length}</span> event
                {events.length !== 1 ? 's' : ''}
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
              Browse events and register to attend
            </p>
            <button
              onClick={() => navigate('/events')}
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
            >
              <FiCalendar />
              <span>Browse Events</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAttendingEventsPage;