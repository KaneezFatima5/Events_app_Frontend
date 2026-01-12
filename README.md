# 🎓 Campus Events - Frontend

<div align="center">

![Campus Events](https://img.shields.io/badge/Campus-Events-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)

**Your central hub for discovering and managing all university events**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack)

</div>

---

## 📸 Screenshots

<div align="center">

### Landing Page
![Landing Page](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Landing+Page)

### Event Discovery
![Event Discovery](https://via.placeholder.com/800x400/8b5cf6/ffffff?text=Event+Discovery)

### Event Details
![Event Details](https://via.placeholder.com/800x400/10b981/ffffff?text=Event+Details)

</div>

---

## ✨ Features

### 🔐 **Authentication & Authorization**
- **Secure Login/Signup** - JWT-based authentication
- **Password Recovery** - Forgot password functionality with email verification
- **Role-Based Access** - Separate features for Attendees and Organizers
- **Protected Routes** - Secure pages based on user roles

### 📅 **Event Management**
- **Browse Events** - Discover all campus events with beautiful card layouts
- **Advanced Filtering** - Filter by department, type, date range, and search
- **Event Details** - Rich event pages with images, descriptions, and organizer info
- **Create Events** - Organizers can create events with image uploads
- **Edit/Delete** - Full CRUD operations for event organizers
- **My Events** - Dashboard for organizers to manage their events

### 🎟️ **Attendance & Engagement**
- **Register for Events** - Mark yourself as attending with one click
- **Attendance Tracking** - Real-time attendee count and capacity management
- **My Attending Events** - Personal dashboard of all registered events
- **Attendees List** - View all participants for any event
- **Capacity Alerts** - Get notified when events are at full capacity

### 📆 **Calendar Integration**
- **Download .ics Files** - Export events to your favorite calendar app
- **One-Click Import** - Compatible with Google Calendar, Apple Calendar, Outlook, and more
- **Never Miss an Event** - Sync campus events with your personal schedule

### 🎨 **User Experience**
- **Responsive Design** - Perfect on mobile, tablet, and desktop
- **Modern UI** - Clean, professional interface with Tailwind CSS
- **Real-time Notifications** - Toast alerts for all actions
- **Loading States** - Smooth transitions and feedback
- **Dark Mode Ready** - (Coming soon!)

---

## 🚀 Demo

Check out the live demo: [Campus Events Demo](#) *(Add your deployed link)*

**Test Credentials:**
- **Attendee:** `student@university.edu` / `password123`
- **Organizer:** `organizer@university.edu` / `password123`

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React" />
<br>React
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=vite" width="48" height="48" alt="Vite" />
<br>Vite
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="Tailwind" />
<br>Tailwind
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=javascript" width="48" height="48" alt="JavaScript" />
<br>JavaScript
</td>
</tr>
</table>

### Core Technologies
- **React 18** - Modern UI library with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Additional Libraries
- **React Query** - Data fetching and caching
- **React Hook Form** - Form validation
- **Headless UI** - Unstyled accessible components
- **React Icons** - Beautiful icon library
- **React Toastify** - Elegant notifications
- **date-fns** - Modern date utility library

---

## 📦 Installation

### Prerequisites
- Node.js 16.x or higher
- npm or yarn
- Running backend server ([Backend Repo](#))

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/campus-events-frontend.git
cd campus-events-frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Setup
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

### Step 4: Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 🎯 Usage

### For Students (Attendees)

1. **Browse Events**
   - Visit the homepage to see featured events
   - Go to "All Events" to explore everything
   - Use filters to find events by department, type, or date

2. **Register for Events**
   - Click on any event to view details
   - Click "I'm Attending" to register
   - View all your registered events in "My Attending"

3. **Add to Calendar**
   - Click "Add to Calendar" on any event
   - Import the .ics file to your calendar app

### For Event Organizers

1. **Create Events**
   - Click "Create Event" in the navbar
   - Fill in event details and upload an image
   - Submit to publish your event

2. **Manage Events**
   - View all your events in "My Events"
   - Edit or delete your events anytime
   - Track attendee registrations

3. **Monitor Attendance**
   - View the attendees list on event detail pages
   - Check capacity and registration status
   - See who registered and when

---

## 📁 Project Structure
```
src/
├── api/                    # API integration
│   ├── axios.config.js    # Axios configuration
│   ├── auth.api.js        # Authentication endpoints
│   ├── events.api.js      # Events endpoints
│   ├── files.api.js       # File upload endpoints
│   └── calendar.api.js    # Calendar endpoints
│
├── components/            # Reusable components
│   ├── auth/             # Authentication modals
│   │   ├── LoginModal.jsx
│   │   ├── RegisterModal.jsx
│   │   └── ForgotPasswordModal.jsx
│   ├── events/           # Event-related components
│   │   ├── EventCard.jsx
│   │   ├── EventFilters.jsx
│   │   ├── EventForm.jsx
│   │   └── AttendeesList.jsx
│   ├── layout/           # Layout components
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   └── common/           # Common utilities
│       └── Loading.jsx
│
├── pages/                # Page components
│   ├── LandingPage.jsx
│   ├── AllEventsPage.jsx
│   ├── EventDetailPage.jsx
│   ├── CreateEventPage.jsx
│   ├── EditEventPage.jsx
│   ├── MyEventsPage.jsx
│   └── MyAttendingEventsPage.jsx
│
├── context/              # React Context
│   └── AuthContext.jsx
│
├── utils/                # Utility functions
│   ├── constants.js
│   └── dateHelpers.js
│
├── App.jsx               # Main app component
└── main.jsx             # Entry point
```

---

## 🔧 Configuration

### API Endpoints
Update `src/api/axios.config.js` to configure your backend URL:
```javascript
const API_BASE_URL = 'http://localhost:8080/api/v1';
```

### Tailwind Configuration
Customize theme in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      },
    },
  },
}
```

---

## 🌐 API Integration

This frontend connects to the [Campus Events Backend](https://github.com/yourusername/campus-events-backend).

### Main Endpoints Used:
- `POST /auth/login` - User login
- `POST /auth/register/attendee` - Attendee registration
- `POST /auth/register/organizer` - Organizer registration
- `POST /auth/forgot-password` - Password reset request
- `GET /events` - Get all events (with filters)
- `POST /events` - Create event (organizers only)
- `PUT /events/:id` - Update event
- `DELETE /events/:id` - Delete event
- `POST /events/:id/attend` - Register for event
- `GET /events/:id/attendees` - Get attendee list
- `GET /calendar/events/:id` - Download calendar file

---

## 📱 Responsive Design

Campus Events is fully responsive and works perfectly on:
- 📱 **Mobile** (320px - 767px)
- 📱 **Tablet** (768px - 1023px)
- 💻 **Desktop** (1024px+)

---

## 🎨 Customization

### Change Primary Color
Update `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#your-color',
    600: '#your-darker-color',
    700: '#your-darkest-color',
  },
}
```

### Add New Event Types
Update `src/utils/constants.js`:
```javascript
export const EVENT_TYPES = [
  { value: 'NEW_TYPE', label: 'New Type' },
  // ... existing types
];
```

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to [Netlify](https://app.netlify.com)

### Environment Variables for Production
Make sure to set these in your hosting platform:
- `VITE_API_BASE_URL` - Your production backend URL

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Email: your.email@university.edu

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The amazing UI library
- [Tailwind CSS](https://tailwindcss.com/) - For beautiful styling
- [Headless UI](https://headlessui.com/) - For accessible components
- [React Icons](https://react-icons.github.io/react-icons/) - For beautiful icons
- University Community - For inspiration and feedback

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please open an issue on [GitHub Issues](https://github.com/yourusername/campus-events-frontend/issues).

---

## 📊 Project Status

- ✅ **Authentication** - Complete
- ✅ **Event Management** - Complete
- ✅ **Attendance Tracking** - Complete
- ✅ **Calendar Integration** - Complete
- 🚧 **User Preferences** - In Progress
- 🚧 **Event Recommendations** - Planned
- 🚧 **Push Notifications** - Planned
- 🚧 **Dark Mode** - Planned

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

Made with ❤️ for the Campus Community

[Report Bug](https://github.com/yourusername/campus-events-frontend/issues) • [Request Feature](https://github.com/yourusername/campus-events-frontend/issues)

</div>
