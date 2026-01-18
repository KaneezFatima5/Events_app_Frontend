import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import EventForm from '../components/events/EventForm';
import Loading from '../components/common/Loading';
import { eventsAPI } from '../api/events.api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const EditEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await eventsAPI.getEventById(id);
      const eventData = response.data;

      // Check if user can edit this event
      if (
        eventData.organizer.id !== user?.id &&
        user?.role !== 'ADMIN'
      ) {
        toast.error("You don't have permission to edit this event");
        navigate('/events');
        return;
      }

      setEvent(eventData);
    } catch (error) {
      console.error('Error fetching event:', error);
      toast.error('Failed to load event');
      navigate('/events');
    } finally {
      setLoading(false);
    }
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/events/${id}`)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <FiArrowLeft className="mr-2" />
          Back to Event
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Event</h1>
          <p className="text-gray-600 text-lg">
            Update the details of your event
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <EventForm initialData={event} isEdit={true} />
        </div>
      </div>
    </div>
  );
};

export default EditEventPage;