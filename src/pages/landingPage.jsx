import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiTrendingUp, FiUsers, FiArrowRight } from 'react-icons/fi';
import { eventsAPI } from '../api/events.api';
import EventCard from '../components/events/EventCard';
import Loading from '../components/common/Loading';

const LandingPage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      const response = await eventsAPI.getAllEvents({});
      // Get first 6 upcoming events
      setUpcomingEvents(response.data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Discover Campus Events
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Your central hub for all university events. Stay connected,
              explore opportunities, and never miss what's happening on campus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/events"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition inline-flex items-center justify-center"
              >
                Explore All Events
                <FiArrowRight className="ml-2" />
              </Link>
              
                <a href="#features"
                className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-800 transition inline-flex items-center justify-center border-2 border-white/20"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCalendar className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">
                {upcomingEvents.length}+
              </h3>
              <p className="text-gray-600">Upcoming Events</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Active Students</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrendingUp className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">Event Organizers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Upcoming Events
              </h2>
              <p className="text-gray-600">
                Don't miss out on these exciting campus activities
              </p>
            </div>
            <Link
              to="/events"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center"
            >
              View All
              <FiArrowRight className="ml-2" />
            </Link>
          </div>

          {loading ? (
            <Loading />
          ) : upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <FiCalendar className="text-gray-400 text-6xl mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                No upcoming events at the moment
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Campus Events?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Everything you need to stay connected with campus life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FiCalendar className="text-primary-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Easy Discovery
              </h3>
              <p className="text-gray-600">
                Find events that match your interests with powerful search and
                filtering options
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FiUsers className="text-primary-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Stay Connected
              </h3>
              <p className="text-gray-600">
                Get notifications about events you're interested in and never
                miss an opportunity
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FiTrendingUp className="text-primary-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                For Organizers
              </h3>
              <p className="text-gray-600">
                Create and manage events effortlessly. Reach your target
                audience effectively
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join hundreds of students discovering amazing campus events
          </p>
          <Link
            to="/events"
            className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition inline-flex items-center"
          >
            Browse Events
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;