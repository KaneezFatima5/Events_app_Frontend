import { FiCalendar, FiGithub, FiMail, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-secondary-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-500 p-2 rounded-lg">
                <FiCalendar className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold">Campus Events</span>
            </div>
            <p className="text-gray-300 mb-3">
              Your central hub for discovering and managing all campus events at the University of New Mexico.
            </p>
            <div className="flex items-center space-x-2 text-gray-300">
              <FiMapPin className="text-primary-400" />
              <span>Albuquerque, NM</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-primary-400 transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/events"
                  className="text-gray-300 hover:text-primary-400 transition"
                >
                  All Events
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-primary-400 transition"
                >
                  About UNM
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-primary-400 transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-400">Get in Touch</h3>
            <div className="space-y-3">
              <a
                href="mailto:support@campusevents.unm.edu"
                className="flex items-center space-x-2 text-gray-300 hover:text-primary-400 transition"
              >
                <FiMail />
                <span>support@campusevents.unm.edu</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-300 hover:text-primary-400 transition"
              >
                <FiGithub />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-secondary-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2026 Campus Events - University of New Mexico. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Go Lobos! 🐺
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;