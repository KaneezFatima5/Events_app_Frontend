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
  const { user, loading: authLoading } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Debug: Log user object structure
  useEffect(() => {
    console.log('=== AUTH STATE ===');
    console.log('authLoading:', authLoading);
    console.log('user object:', user);
    console.log('user keys:', user ? Object.keys(user) : 'user is null/undefined');
  }, [user, authLoading]);

  useEffect(() => {
    if (!authLoading && user) {
      fetchEvent();
    } else if (!authLoading && !user) {
      toast.error('Please log in to edit events');
      navigate('/login');
    }
  }, [id, user, authLoading]);

  const fetchEvent = async () => {
    try {
      const response = await eventsAPI.getEventById(id);
      const eventData = response.data;

      console.log('=== PERMISSION CHECK ===');
      console.log('Full user object:', user);
      console.log('Event Organizer ID:', eventData.organizer.id, typeof eventData.organizer.id);
      console.log('Current User ID:', user.id, typeof user.id);
      console.log('User Role:', user.role);

      // Check if user can edit this event
      if (
        Number(eventData.organizer.id) !== Number(user.id) &&
        user.role !== 'ADMIN'
      ) {
        console.log('Permission denied!');
        toast.error("You don't have permission to edit this event");
        navigate('/events');
        return;
      }

      console.log('Permission granted!');
      setEvent(eventData);
    } catch (error) {
      console.error('Error fetching event:', error);
      toast.error('Failed to load event');
      navigate('/events');
    } finally {
      setLoading(false);
    }
  };

  // Show loading while auth or event is loading
  if (loading || authLoading) {
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
        <button
          onClick={() => navigate(`/events/${id}`)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <FiArrowLeft className="mr-2" />
          Back to Event
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Event</h1>
          <p className="text-gray-600 text-lg">
            Update the details of your event
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <EventForm initialData={event} isEdit={true} />
        </div>
      </div>
    </div>
  );
};

export default EditEventPage;