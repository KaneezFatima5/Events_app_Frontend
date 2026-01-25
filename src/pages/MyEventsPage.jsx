import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPlus, FiCalendar, FiEdit, FiTrash2 } from 'react-icons/fi';
import { eventsAPI } from '../api/events.api';
import Loading from '../components/common/Loading';
import { useAuth } from '../context/AuthContext';
import { formatDate, formatTime } from '../utils/dateHelpers';
import { toast } from 'react-toastify';

const MyEventsPage = () => {
  const navigate = useNavigate();
  const { isOrganizer } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
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
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId, eventTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${eventTitle}"?`)) {
      return;
    }

    setDeletingId(eventId);
    try {
      await eventsAPI.deleteEvent(eventId);
      toast.success('Event deleted successfully');
      // Remove from list
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    } finally {
      setDeletingId(null);
    }
  };

  const getEventTypeColor = (type) => {
    const colors = {
      EDUCATIONAL: 'bg-blue-100 text-blue-800 border border-blue-200',
      RECREATIONAL: 'bg-green-100 text-green-800 border border-green-200',
      COMPETITION: 'bg-primary-100 text-primary-800 border border-primary-200',
      WORKSHOP: 'bg-purple-100 text-purple-800 border border-purple-200',
      SEMINAR: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      SPORTS: 'bg-orange-100 text-orange-800 border border-orange-200',
      CULTURAL: 'bg-pink-100 text-pink-800 border border-pink-200',
      OTHER: 'bg-secondary-100 text-secondary-800 border border-secondary-200',
    };
    return colors[type] || colors.OTHER;
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
            className="flex items-center space-x-2 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition shadow-lg"
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
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {event.imageUrl ? (
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                        <FiCalendar className="text-white text-6xl opacity-50" />
                      </div>
                    )}
                    
                    {/* Event Type Badge */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getEventTypeColor(
                          event.type
                        )}`}
                      >
                        {event.type}
                      </span>
                    </div>

                    {/* Attendee Count Badge */}
                    {event.attendeeCount > 0 && (
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                          {event.attendeeCount} attending
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <FiCalendar className="mr-2 text-primary-600" />
                        <span>
                          {formatDate(event.startDate)} · {formatTime(event.startDate)}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t border-gray-200">
                      <Link
                        to={`/events/${event.id}`}
                        className="flex-1 text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
                      >
                        View Details
                      </Link>
                      <Link
                        to={`/events/${event.id}/edit`}
                        className="flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
                        title="Edit Event"
                      >
                        <FiEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(event.id, event.title)}
                        disabled={deletingId === event.id}
                        className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete Event"
                      >
                        {deletingId === event.id ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <FiTrash2 />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
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
              className="inline-flex items-center space-x-2 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition"
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