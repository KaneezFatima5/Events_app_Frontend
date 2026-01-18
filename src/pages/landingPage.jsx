import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiTrendingUp, FiUsers, FiArrowRight, FiCheckCircle, FiStar, FiBell } from 'react-icons/fi';
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
      {/* Hero Section with UNM Cherry Red */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* UNM Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
              <FiCalendar className="text-white" />
              <span className="text-white font-semibold">University of New Mexico</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Campus Events
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-8 max-w-3xl mx-auto">
              Your central hub for all university events. Stay connected,
              explore opportunities, and never miss what's happening at UNM.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/events"
                className="bg-white text-primary-500 px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition inline-flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Explore All Events
                <FiArrowRight className="ml-2" />
              </Link>
              <a
                href="#features"
                className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-800 transition inline-flex items-center justify-center border-2 border-white/30 shadow-xl hover:shadow-2xl"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow border-4 border-white">
                <FiCalendar className="text-primary-600 text-3xl" />
              </div>
              <h3 className="text-5xl font-bold text-primary-500 mb-2">
                {upcomingEvents.length}+
              </h3>
              <p className="text-secondary-600 font-medium">Upcoming Events</p>
            </div>
            <div className="text-center group">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow border-4 border-white">
                <FiUsers className="text-primary-600 text-3xl" />
              </div>
              <h3 className="text-5xl font-bold text-primary-500 mb-2">500+</h3>
              <p className="text-secondary-600 font-medium">Active Students</p>
            </div>
            <div className="text-center group">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow border-4 border-white">
                <FiTrendingUp className="text-primary-600 text-3xl" />
              </div>
              <h3 className="text-5xl font-bold text-primary-500 mb-2">50+</h3>
              <p className="text-secondary-600 font-medium">Event Organizers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-secondary-800 mb-2">
                Upcoming Events
              </h2>
              <p className="text-secondary-600 text-lg">
                Don't miss out on these exciting campus activities
              </p>
            </div>
            <Link
              to="/events"
              className="text-primary-500 hover:text-primary-600 font-semibold flex items-center group"
            >
              View All
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
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
            <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <FiCalendar className="text-gray-400 text-6xl mx-auto mb-4" />
              <p className="text-secondary-600 text-lg">
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
            <h2 className="text-4xl font-bold text-secondary-800 mb-4">
              Why Campus Events?
            </h2>
            <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
              Everything you need to stay connected with campus life at UNM
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-primary-500">
              <div className="bg-primary-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <FiCalendar className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-800 mb-3">
                Easy Discovery
              </h3>
              <p className="text-secondary-600">
                Find events that match your interests with powerful search and
                filtering options across all UNM departments.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-primary-500">
              <div className="bg-primary-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <FiBell className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-800 mb-3">
                Stay Connected
              </h3>
              <p className="text-secondary-600">
                Get notifications about events you're interested in and never
                miss an opportunity to connect with the Lobo community.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-primary-500">
              <div className="bg-primary-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <FiTrendingUp className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-800 mb-3">
                For Organizers
              </h3>
              <p className="text-secondary-600">
                Create and manage events effortlessly. Reach your target
                audience and track attendance with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary-800 mb-4">
              How It Works
            </h2>
            <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
              Getting started is easy - just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2 items-start">
            {/* Step 1 */}
            <div className="text-center relative">
              <div className="bg-primary-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-secondary-800 mb-3">
                Create Account
              </h3>
              <p className="text-secondary-600">
                Sign up with your UNM email as an attendee or event organizer
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <FiArrowRight className="text-primary-500 text-4xl" />
            </div>

            {/* Step 2 */}
            <div className="text-center relative">
              <div className="bg-primary-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-secondary-800 mb-3">
                Browse Events
              </h3>
              <p className="text-secondary-600">
                Explore events by department, type, or date to find what interests you
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <FiArrowRight className="text-primary-500 text-4xl" />
            </div>

            {/* Step 3 */}
            <div className="text-center relative">
              <div className="bg-primary-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-secondary-800 mb-3">
                Register & Attend
              </h3>
              <p className="text-secondary-600">
                Mark yourself as attending and add events to your calendar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/*<section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary-800 mb-4">
              What Students Say
            </h2>
            <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
              Hear from fellow Lobos about their experience
            </p>
          </div>
            //  Testimonial 1 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-primary-500">
              <div className="flex items-center mb-4">
                <FiStar className="text-yellow-400 fill-current" />
                <FiStar className="text-yellow-400 fill-current" />
                <FiStar className="text-yellow-400 fill-current" />
                <FiStar className="text-yellow-400 fill-current" />
                <FiStar className="text-yellow-400 fill-current" />
              </div>
              <p className="text-secondary-600 mb-4 italic">
                "Campus Events makes it so easy to stay updated on everything happening at UNM. I never miss a workshop now!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">SJ</span>
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-secondary-800">Sarah Johnson</p>
                  <p className="text-sm text-secondary-500">Computer Science</p>
                </div>
              </div>
            </div>

            //  Testimonial 2 
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-primary-500">
              <div className="flex items-center mb-4">
                <FiStar className="text-yellow-400 fill-current" />
                <FiStar className="text-yellow-400 fill-current" />
                <FiStar className="text-yellow-400 fill-current" />
                <FiStar className="text-yellow-400 fill-current" />
                <FiStar className="text-yellow-400 fill-current" />
              </div>
              <p className="text-secondary-600 mb-4 italic">
                "As an organizer, this platform has been a game-changer. Managing events and tracking attendance is a breeze!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">MR</span>
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-secondary-800">Michael Rodriguez</p>
                  <p className="text-sm text-secondary-500">Business Admin</p>
                </div>
              </div>
            </div>

            // Testimonial 3 
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-primary-500">
              <div className="flex items-center mb-4">
                <FiStar className="text-yellow-400 fill-current" />
                <FiStar className="text-yellow-400 fill-current" />
                <FiStar className="text-yellow-400 fill-current" />
                <FiStar className="text-yellow-400 fill-current" />
                <FiStar className="text-yellow-400 fill-current" />
              </div>
              <p className="text-secondary-600 mb-4 italic">
                "I love how I can filter events by my department and add them directly to my calendar. Super convenient!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">EC</span>
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-secondary-800">Emily Chen</p>
                  <p className="text-sm text-secondary-500">Engineering</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>*/}

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Join hundreds of Lobos discovering amazing campus events
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/events"
              className="bg-white text-primary-500 px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition inline-flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Browse Events
              <FiArrowRight className="ml-2" />
            </Link>
            <Link
              to="/events"
              className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-800 transition inline-flex items-center justify-center border-2 border-white/30 shadow-xl hover:shadow-2xl"
            >
              <FiCheckCircle className="mr-2" />
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;