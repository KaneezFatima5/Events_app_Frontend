import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiUsers, FiClock } from 'react-icons/fi';
import { formatDate, formatTime } from '../../utils/dateHelpers';

const eventCard = ({ event }) => {
  const getEventTypeColor = (type) => {
    const colors = {
      EDUCATIONAL: 'bg-blue-100 text-blue-800',
      RECREATIONAL: 'bg-green-100 text-green-800',
      COMPETITION: 'bg-red-100 text-red-800',
      WORKSHOP: 'bg-purple-100 text-purple-800',
      SEMINAR: 'bg-yellow-100 text-yellow-800',
      SPORTS: 'bg-orange-100 text-orange-800',
      CULTURAL: 'bg-pink-100 text-pink-800',
      OTHER: 'bg-gray-100 text-gray-800',
    };
    return colors[type] || colors.OTHER;
  };

  return (
    <Link
      to={`/events/${event.id}`}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
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

          {/* Capacity (if available) */}
          {event.capacity && (
            <div className="flex items-center text-gray-600 text-sm">
              <FiClock className="mr-2 text-primary-600" />
              <span>Capacity: {event.capacity}</span>
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
  );
};

export default eventCard;