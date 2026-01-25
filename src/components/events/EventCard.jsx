import { Link, useNavigate } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiUsers, FiClock, FiEdit, FiTrash2 } from 'react-icons/fi';
import { formatDate, formatTime } from '../../utils/dateHelpers';
import { useAuth } from '../../context/AuthContext';
import { eventsAPI } from '../../api/events.api';
import { toast } from 'react-toastify';
import { useState } from 'react';

const EventCard = ({ event, onDelete }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const isOwner = user && (event.organizer?.id === user.id || user.role === 'ADMIN');

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

  const handleDelete = async (e) => {
    e.preventDefault(); // Prevent navigation
    
    if (!window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
      return;
    }

    setDeleting(true);
    try {
      await eventsAPI.deleteEvent(event.id);
      toast.success('Event deleted successfully');
      if (onDelete) {
        onDelete(event.id); // Callback to parent to update list
      } else {
        navigate('/my-events');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group relative">
      {/* Edit/Delete Buttons Overlay (for owners) */}
      {isOwner && (
        <div className="absolute top-3 left-3 z-20 flex gap-2">
          <Link
            to={`/events/${event.id}/edit`}
            onClick={(e) => e.stopPropagation()}
            className="bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600 transition shadow-lg"
            title="Edit Event"
          >
            <FiEdit size={16} />
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition shadow-lg disabled:opacity-50"
            title="Delete Event"
          >
            {deleting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FiTrash2 size={16} />
            )}
          </button>
        </div>
      )}

      <Link to={`/events/${event.id}`} className="block">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 flex items-center space-x-1">
                <FiUsers size={12} />
                <span>{event.attendeeCount} attending</span>
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>

          {/* Event Details */}
          <div className="space-y-2">
            {/* Date & Time */}
            <div className="flex items-center text-gray-600 text-sm">
              <FiCalendar className="mr-2 text-primary-600" />
              <span>
                {formatDate(event.startDate)} · {formatTime(event.startDate)}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center text-gray-600 text-sm">
              <FiMapPin className="mr-2 text-primary-600" />
              <span className="line-clamp-1">{event.location}</span>
            </div>

            {/* Department */}
            <div className="flex items-center text-gray-600 text-sm">
              <FiUsers className="mr-2 text-primary-600" />
              <span>{event.department}</span>
            </div>

            {/* Capacity */}
            {event.capacity && (
              <div className="flex items-center text-gray-600 text-sm">
                <FiClock className="mr-2 text-primary-600" />
                <span>
                  {event.attendeeCount || 0} / {event.capacity} capacity
                </span>
              </div>
            )}
          </div>

          {/* Organizer */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Organized by{' '}
              <span className="font-medium text-gray-700">
                {event.organizer?.fullName}
              </span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;