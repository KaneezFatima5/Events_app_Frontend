import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/authContext';
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import LoginModal from './components/auth/loginModal';
import RegisterModal from './components/auth/registerModal';

import LandingPage from './pages/landingPage';
import AllEventsPage from './pages/allEventsPage';
import EventDetailPage from './pages/eventDetail';
import CreateEventPage from './pages/createEvent';
import EditEventPage from './pages/editEvent';
import MyEventsPage from './pages/myEvents';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleOpenLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const handleOpenRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar
              onOpenLogin={handleOpenLogin}
              onOpenRegister={handleOpenRegister}
            />

            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/events" element={<AllEventsPage />} />
                <Route path="/events/:id" element={<EventDetailPage />} />
                <Route path="/events/:id/edit" element={<EditEventPage />} />
                <Route path="/create-event" element={<CreateEventPage />} />
                <Route path="/my-events" element={<MyEventsPage />} />
              </Routes>
            </main>

            <Footer />

            {/* Auth Modals */}
            <LoginModal
              isOpen={isLoginOpen}
              onClose={() => setIsLoginOpen(false)}
              onSwitchToRegister={handleOpenRegister}
            />
            <RegisterModal
              isOpen={isRegisterOpen}
              onClose={() => setIsRegisterOpen(false)}
              onSwitchToLogin={handleOpenLogin}
            />

            {/* Toast Notifications */}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;