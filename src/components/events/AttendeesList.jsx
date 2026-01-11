import { useState, useEffect } from 'react';
import { FiUsers, FiMail } from 'react-icons/fi';
import { eventsAPI } from '../../api/events.api';
import { formatDateTime } from '../../utils/dateHelpers';

const AttendeesList = ({ eventId }) => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendees();
  }, [eventId]);

  const fetchAttendees = async () => {
    try {
      const response = await eventsAPI.getEventAttendees(eventId);
      setAttendees(response.data);
    } catch (error) {
      console.error('Error fetching attendees:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading attendees...</div>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
        <FiUsers className="mr-2" />
        Attendees ({attendees.length})
      </h3>

      {attendees.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <FiUsers className="text-gray-400 text-4xl mx-auto mb-2" />
          <p className="text-gray-600">No attendees yet. Be the first to register!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {attendees.map((attendee) => (
            <div
              key={attendee.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-semibold text-lg">
                    {attendee.fullName.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate">
                    {attendee.fullName}
                  </h4>
                  <p className="text-sm text-gray-600 truncate flex items-center mt-1">
                    <FiMail className="mr-1 flex-shrink-0" size={14} />
                    {attendee.email}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {attendee.department}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Registered {formatDateTime(attendee.registeredAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendeesList;