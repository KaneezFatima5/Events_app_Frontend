// import { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import {
//   FiCalendar,
//   FiMapPin,
//   FiClock,
//   FiUsers,
//   FiEdit,
//   FiTrash2,
//   FiArrowLeft,
//   FiDownload,
//   FiCheck,
//   FiX,
// } from 'react-icons/fi';
// import { eventsAPI } from '../api/events.api';
// import { calendarAPI } from '../api/calendar.api';
// import { useAuth } from '../context/AuthContext';
// import Loading from '../components/common/Loading';
// import AttendeesList from '../components/events/AttendeesList';
// import { formatDate, formatTime } from '../utils/dateHelpers';
// import { toast } from 'react-toastify';

// const EventDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user, isOrganizer, isAuthenticated } = useAuth();
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [deleting, setDeleting] = useState(false);
//   const [attendanceStatus, setAttendanceStatus] = useState({
//     isAttending: false,
//     attendeeCount: 0,
//   });
//   const [attendanceLoading, setAttendanceLoading] = useState(false);

//   useEffect(() => {
//     fetchEvent();
//     if (isAuthenticated) {
//       fetchAttendanceStatus();
//     }
//   }, [id, isAuthenticated]);

//   const fetchEvent = async () => {
//     try {
//       const response = await eventsAPI.getEventById(id);
//       setEvent(response.data);
//       setAttendanceStatus((prev) => ({
//         ...prev,
//         attendeeCount: response.data.attendeeCount || 0,
//       }));
//     } catch (error) {
//       console.error('Error fetching event:', error);
//       toast.error('Failed to load event');
//       navigate('/events');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAttendanceStatus = async () => {
//     try {
//       const response = await eventsAPI.getAttendanceStatus(id);
//       setAttendanceStatus(response.data);
//     } catch (error) {
//       console.error('Error fetching attendance status:', error);
//     }
//   };

//   const handleAttendanceToggle = async () => {
//     if (!isAuthenticated) {
//       toast.info('Please login to register for events');
//       return;
//     }

//     setAttendanceLoading(true);
//     try {
//       if (attendanceStatus.isAttending) {
//         const response = await eventsAPI.unmarkAttending(id);
//         setAttendanceStatus(response.data);
//         toast.success('Unregistered from event');
//       } else {
//         const response = await eventsAPI.markAttending(id);
//         setAttendanceStatus(response.data);
//         toast.success('Successfully registered for event!');
//       }
//     } catch (error) {
//       const message = error.response?.data?.message || 'Failed to update attendance';
//       toast.error(message);
//     } finally {
//       setAttendanceLoading(false);
//     }
//   };

//   const handleDownloadCalendar = () => {
//     calendarAPI.downloadEventCalendar(id);
//     toast.success('Calendar file downloaded!');
//   };

//   const handleDelete = async () => {
//     if (!window.confirm('Are you sure you want to delete this event?')) {
//       return;
//     }

//     setDeleting(true);
//     try {
//       await eventsAPI.deleteEvent(id);
//       toast.success('Event deleted successfully');
//       navigate('/my-events');
//     } catch (error) {
//       console.error('Error deleting event:', error);
//       toast.error('Failed to delete event');
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const canEditOrDelete = () => {
//     if (!user || !event) return false;
//     return event.organizer.id === user.id || user.role === 'ADMIN';
//   };

//   const getEventTypeColor = (type) => {
//   const colors = {
//     EDUCATIONAL: 'bg-blue-100 text-blue-800 border border-blue-200',
//     RECREATIONAL: 'bg-green-100 text-green-800 border border-green-200',
//     COMPETITION: 'bg-primary-100 text-primary-800 border border-primary-200',
//     WORKSHOP: 'bg-purple-100 text-purple-800 border border-purple-200',
//     SEMINAR: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
//     SPORTS: 'bg-orange-100 text-orange-800 border border-orange-200',
//     CULTURAL: 'bg-pink-100 text-pink-800 border border-pink-200',
//     OTHER: 'bg-secondary-100 text-secondary-800 border border-secondary-200',
//   };
//   return colors[type] || colors.OTHER;
// };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8">
//         <Loading />
//       </div>
//     );
//   }

//   if (!event) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition"
//         >
//           <FiArrowLeft className="mr-2" />
//           Back
//         </button>

//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
//           <div className="relative h-96">
//             {event.imageUrl ? (
//               <img
//                 src={event.imageUrl}
//                 alt={event.title}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
//                 <FiCalendar className="text-white text-9xl opacity-50" />
//               </div>
//             )}

//             <div className="absolute top-6 right-6">
//               <span
//                 className={`px-4 py-2 rounded-full text-sm font-semibold ${getEventTypeColor(
//                   event.type
//                 )}`}
//               >
//                 {event.type}
//               </span>
//             </div>
//           </div>

//           <div className="p-8">
//             <div className="flex justify-between items-start mb-6">
//               <h1 className="text-4xl font-bold text-gray-900">
//                 {event.title}
//               </h1>

//               {canEditOrDelete() && (
//                 <div className="flex space-x-2">
//                   <Link
//                     to={`/events/${event.id}/edit`}
//                     className="flex items-center space-x-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
//                   >
//                     <FiEdit />
//                     <span>Edit</span>
//                   </Link>
//                   <button
//                     onClick={handleDelete}
//                     disabled={deleting}
//                     className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
//                   >
//                     <FiTrash2 />
//                     <span>{deleting ? 'Deleting...' : 'Delete'}</span>
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Attendance Info Badge */}
//             <div className="mb-6 inline-flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-lg">
//               <FiUsers className="text-primary-600" />
//               <span className="text-primary-800 font-medium">
//                 {attendanceStatus.attendeeCount} {attendanceStatus.attendeeCount === 1 ? 'person' : 'people'} attending
//                 {event.capacity && ` / ${event.capacity} capacity`}
//               </span>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//               <div className="flex items-start space-x-3">
//                 <FiCalendar className="text-primary-600 text-xl mt-1" />
//                 <div>
//                   <p className="text-sm text-gray-600">Date & Time</p>
//                   <p className="text-gray-900 font-medium">
//                     {formatDate(event.startDate)}
//                   </p>
//                   <p className="text-gray-700">
//                     {formatTime(event.startDate)} - {formatTime(event.endDate)}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start space-x-3">
//                 <FiMapPin className="text-primary-600 text-xl mt-1" />
//                 <div>
//                   <p className="text-sm text-gray-600">Location</p>
//                   <p className="text-gray-900 font-medium">{event.location}</p>
//                 </div>
//               </div>

//               <div className="flex items-start space-x-3">
//                 <FiUsers className="text-primary-600 text-xl mt-1" />
//                 <div>
//                   <p className="text-sm text-gray-600">Department</p>
//                   <p className="text-gray-900 font-medium">
//                     {event.department}
//                   </p>
//                 </div>
//               </div>

//               {event.capacity && (
//                 <div className="flex items-start space-x-3">
//                   <FiClock className="text-primary-600 text-xl mt-1" />
//                   <div>
//                     <p className="text-sm text-gray-600">Capacity</p>
//                     <p className="text-gray-900 font-medium">
//                       {event.capacity} attendees
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="mb-8">
//               <h2 className="text-2xl font-semibold text-gray-900 mb-4">
//                 About This Event
//               </h2>
//               <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
//                 {event.description}
//               </p>
//             </div>

//             <div className="border-t border-gray-200 pt-6 mb-8">
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                 Organized By
//               </h3>
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
//                   <span className="text-primary-600 font-semibold text-lg">
//                     {event.organizer.fullName.charAt(0)}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-900">
//                     {event.organizer.fullName}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     {event.organizer.department}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               {canEditOrDelete() && (
//                   <div className="flex flex-wrap gap-3">
//                     <Link
//                       to={`/events/${event.id}/edit`}
//                       className="flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition shadow-lg flex-1 sm:flex-initial justify-center"
//                     >
//                       <FiEdit />
//                       <span>Edit Event</span>
//                     </Link>
//                     <button
//                       onClick={handleDelete}
//                       disabled={deleting}
//                       className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-initial justify-center"
//                     >
//                       {deleting ? (
//                         <>
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           <span>Deleting...</span>
//                         </>
//                       ) : (
//                         <>
//                           <FiTrash2 />
//                           <span>Delete Event</span>
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 )}
//               <button
//                 onClick={handleDownloadCalendar}
//                 className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
//               >
//                 <FiDownload />
//                 <span>Add to Calendar</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Attendees List */}
//         <div className="bg-white rounded-2xl shadow-lg p-8">
//           <AttendeesList eventId={id} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDetailPage;
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FiCalendar,
  FiMapPin,
  FiClock,
  FiUsers,
  FiEdit,
  FiTrash2,
  FiArrowLeft,
  FiDownload,
} from 'react-icons/fi';
import { eventsAPI } from '../api/events.api';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/common/Loading';
import { formatDate, formatTime, formatDateTime } from '../utils/dateHelpers';
import { toast } from 'react-toastify';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isOrganizer } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await eventsAPI.getEventById(id);
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching event:', error);
      toast.error('Failed to load event');
      navigate('/events');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    setDeleting(true);
    try {
      await eventsAPI.deleteEvent(id);
      toast.success('Event deleted successfully');
      navigate('/my-events');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    } finally {
      setDeleting(false);
    }
  };

  const canEditOrDelete = () => {
    if (!user || !event) return false;
    return (
      event.organizer.id === user.id ||
      user.role === 'ADMIN'
    );
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <Loading />
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <FiArrowLeft className="mr-2" />
          Back
        </button>

        {/* Event Image */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-96">
            {event.imageUrl ? (
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <FiCalendar className="text-white text-9xl opacity-50" />
              </div>
            )}

            {/* Event Type Badge */}
            <div className="absolute top-6 right-6">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${getEventTypeColor(
                  event.type
                )}`}
              >
                {event.type}
              </span>
            </div>
          </div>

          {/* Event Content */}
          <div className="p-8">
            {/* Title and Actions */}
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-4xl font-bold text-gray-900">
                {event.title}
              </h1>

              {canEditOrDelete() && (
                <div className="flex space-x-2">
                  <Link
                    to={`/events/${event.id}/edit`}
                    className="flex items-center space-x-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                  >
                    <FiEdit />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                  >
                    <FiTrash2 />
                    <span>{deleting ? 'Deleting...' : 'Delete'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-3">
                <FiCalendar className="text-primary-600 text-xl mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Date & Time</p>
                  <p className="text-gray-900 font-medium">
                    {formatDate(event.startDate)}
                  </p>
                  <p className="text-gray-700">
                    {formatTime(event.startDate)} - {formatTime(event.endDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FiMapPin className="text-primary-600 text-xl mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="text-gray-900 font-medium">{event.location}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FiUsers className="text-primary-600 text-xl mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="text-gray-900 font-medium">
                    {event.department}
                  </p>
                </div>
              </div>

              {event.capacity && (
                <div className="flex items-start space-x-3">
                  <FiClock className="text-primary-600 text-xl mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Capacity</p>
                    <p className="text-gray-900 font-medium">
                      {event.capacity} attendees
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                About This Event
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>

            {/* Organizer Info */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Organized By
              </h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-lg">
                    {event.organizer.fullName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {event.organizer.fullName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {event.organizer.department}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-medium">
                I'm Attending
              </button>
              <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium">
                <FiDownload />
                <span>Add to Calendar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;