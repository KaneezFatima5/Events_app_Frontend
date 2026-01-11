import { FiCalendar, FiGithub, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FiCalendar className="text-primary-400 text-2xl" />
              <span className="text-xl font-bold">Campus Events</span>
            </div>
            <p className="text-gray-400">
              Your central hub for discovering and managing all campus events.
              Stay connected with your university community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                
                  <a href="/"
                  className="text-gray-400 hover:text-white transition"
                >
                  Home
                </a>
              </li>
              <li>
                
                  <a href="/events"
                  className="text-gray-400 hover:text-white transition"
                >
                  All Events
                </a>
              </li>
              <li>
                
                  <a href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  About Us
                </a>
              </li>
              <li>
                
                  <a href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3">
              
                <a href="mailto:support@campusevents.edu"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition"
              >
                <FiMail />
                <span>support@campusevents.edu</span>
              </a>
              
                <a href="#"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition"
              >
                <FiGithub />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Campus Events. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;