import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMoreVertical, FiEdit, FiTrash2, FiEye } from 'react-icons/fi';
import { eventsAPI } from '../../api/events.api';
import { toast } from 'react-toastify';

const EventActionsMenu = ({ event, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
      return;
    }

    setDeleting(true);
    try {
      await eventsAPI.deleteEvent(event.id);
      toast.success('Event deleted successfully');
      if (onDelete) {
        onDelete(event.id);
      } else {
        navigate('/my-events');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    } finally {
      setDeleting(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-2 hover:bg-gray-100 rounded-lg transition"
      >
        <FiMoreVertical />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          <Link
            to={`/events/${event.id}`}
            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition"
            onClick={() => setIsOpen(false)}
          >
            <FiEye className="text-gray-600" />
            <span className="text-gray-700">View Details</span>
          </Link>
          <Link
            to={`/events/${event.id}/edit`}
            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition"
            onClick={() => setIsOpen(false)}
          >
            <FiEdit className="text-primary-600" />
            <span className="text-gray-700">Edit Event</span>
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-red-50 transition text-left disabled:opacity-50"
          >
            <FiTrash2 className="text-red-600" />
            <span className="text-red-600">
              {deleting ? 'Deleting...' : 'Delete Event'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default EventActionsMenu;