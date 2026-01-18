import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import EventForm from '../components/events/EventForm';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const CreateEventPage = () => {
  const navigate = useNavigate();
  const { isOrganizer } = useAuth();

  useEffect(() => {
    // Redirect if user is not an organizer
    if (!isOrganizer()) {
      navigate('/');
    }
  }, [isOrganizer, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <FiArrowLeft className="mr-2" />
          Back
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create New Event
          </h1>
          <p className="text-gray-600 text-lg">
            Fill in the details to create an amazing campus event
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <EventForm />
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;