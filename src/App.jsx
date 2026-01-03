import React, { useState, useEffect, useContext, createContext } from 'react';

// ============================================
// CONTEXTS
// ============================================

const AuthContext = createContext(null);
const TripPlannerContext = createContext(null);

// ============================================
// GLOBAL STYLES
// ============================================

const globalStyles = `
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background-color: #f5f5f8;
    color: #111827;
  }

  button {
    font-family: inherit;
  }

  .btn {
    border-radius: 999px;
    border: none;
    padding: 10px 18px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }

  .btn-primary {
    background-color: #2563eb;
    color: #ffffff;
  }

  .btn-primary:hover {
    background-color: #1d4ed8;
  }

  .btn-outline {
    background-color: #ffffff;
    border: 1px solid #d1d5db;
    color: #111827;
  }

  .btn-outline:hover {
    background-color: #f3f4f6;
  }

  .btn-sm {
    padding: 6px 12px;
    font-size: 12px;
  }

  input,
  select,
  textarea {
    font-family: inherit;
  }

  .form-group {
    margin-bottom: 14px;
  }

  .form-label {
    display: block;
    margin-bottom: 4px;
    font-size: 12px;
    color: #4b5563;
  }

  .form-control {
    width: 100%;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    font-size: 14px;
    background-color: #ffffff;
  }

  .form-control:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.3);
  }

  /* Login Page */
  .login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .login-card {
    background-color: #ffffff;
    border-radius: 20px;
    padding: 28px 24px;
    width: 100%;
    max-width: 380px;
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.15);
  }

  .login-title {
    margin: 0 0 8px;
    font-size: 24px;
  }

  .login-subtitle {
    margin: 0 0 20px;
    font-size: 14px;
    color: #6b7280;
  }

  .login-btn {
    width: 100%;
    margin-bottom: 10px;
  }

  .login-divider {
    text-align: center;
    margin: 10px 0 6px;
    font-size: 12px;
    color: #9ca3af;
  }

  /* App Shell */
  .app-shell {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .app-content {
    flex: 1;
    overflow-y: auto;
  }

  .bottom-nav {
    display: flex;
    border-top: 1px solid #e5e7eb;
    background-color: #ffffff;
  }

  .bottom-nav-item {
    flex: 1;
    padding: 8px 4px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    font-size: 11px;
    color: #6b7280;
    cursor: pointer;
  }

  .bottom-nav-item-active {
    color: #2563eb;
  }

  .bottom-nav-icon {
    font-size: 18px;
    margin-bottom: 2px;
  }

  /* Home Page */
  .home-page {
    padding: 16px 16px 80px;
  }

  .home-header h2 {
    margin: 0 0 4px;
  }

  .home-header p {
    margin: 0 0 16px;
    font-size: 13px;
    color: #6b7280;
  }

  .trip-planner-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(135deg, #2563eb, #22c55e);
    color: #ffffff;
    border-radius: 18px;
    padding: 18px 16px;
    margin-bottom: 16px;
    box-shadow: 0 14px 30px rgba(37, 99, 235, 0.35);
    cursor: pointer;
  }

  .trip-planner-content h3 {
    margin: 0 0 4px;
    font-size: 18px;
  }

  .trip-planner-content p {
    margin: 0;
    font-size: 13px;
  }

  .trip-planner-arrow {
    font-size: 20px;
  }

  .home-sections {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .home-section-card {
    background-color: #ffffff;
    border-radius: 16px;
    padding: 12px 12px 10px;
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  }

  .home-section-header {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .home-section-icon {
    font-size: 20px;
    margin-right: 8px;
  }

  .home-section-title {
    font-weight: 600;
    font-size: 14px;
  }

  .home-section-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .home-section-chip {
    border-radius: 999px;
    padding: 6px 12px;
    border: 1px solid #e5e7eb;
    background-color: #f9fafb;
    font-size: 12px;
    cursor: pointer;
  }

  .home-section-chip:hover {
    background-color: #e5f0ff;
    border-color: #2563eb;
  }

  /* Trip Planner Modal */
  .trip-modal-backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(15, 23, 42, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    z-index: 40;
  }

  .trip-modal {
    width: 100%;
    max-width: 420px;
    background-color: #ffffff;
    border-radius: 20px;
    padding: 16px 16px 18px;
  }

  .trip-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .trip-modal-header h3 {
    margin: 0;
    font-size: 16px;
  }

  .trip-modal-back-btn {
    border-radius: 999px;
    padding: 6px 12px;
    border: none;
    background-color: #f3f4f6;
    font-size: 12px;
    cursor: pointer;
  }

  .trip-modal-body {
    max-height: 70vh;
    overflow-y: auto;
    padding-top: 6px;
  }

  .trip-step h4 {
    margin-top: 0;
    margin-bottom: 12px;
  }

  .location-row {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
  }

  .location-toggle {
    flex: 1;
    padding: 8px 6px;
    border-radius: 999px;
    border: 1px solid #e5e7eb;
    background-color: #f9fafb;
    font-size: 12px;
    cursor: pointer;
  }

  .location-toggle.active {
    border-color: #2563eb;
    background-color: #e5f0ff;
    color: #1d4ed8;
  }

  .trip-summary {
    background-color: #f3f4f6;
    padding: 10px 12px;
    border-radius: 12px;
    font-size: 12px;
    margin-bottom: 12px;
  }

  .trip-summary-label {
    font-weight: 600;
  }

  .trip-category-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .trip-category-card {
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    padding: 12px 10px;
    background-color: #ffffff;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .trip-category-card:hover {
    border-color: #2563eb;
  }

  .trip-category-icon {
    font-size: 20px;
    margin-bottom: 4px;
  }

  .trip-category-label {
    font-size: 13px;
    font-weight: 500;
  }

  .trip-error {
    color: #b91c1c;
    font-size: 12px;
    margin-bottom: 8px;
  }

  .trip-continue-btn {
    width: 100%;
    margin-top: 6px;
  }

  /* Category List */
  .category-list-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(15, 23, 42, 0.35);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 30;
  }

  .category-list-container {
    width: 100%;
    max-width: 480px;
    background-color: #ffffff;
    border-radius: 20px 20px 0 0;
    max-height: 78vh;
    overflow: hidden;
  }

  .category-list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px 8px;
    border-bottom: 1px solid #e5e7eb;
  }

  .category-list-header h3 {
    margin: 0;
    font-size: 15px;
  }

  .category-list-back {
    border: none;
    background-color: transparent;
    font-size: 13px;
    color: #2563eb;
    cursor: pointer;
  }

  .category-list-body {
    padding: 10px 14px 14px;
    max-height: calc(78vh - 52px);
    overflow-y: auto;
  }

  .place-card {
    display: flex;
    gap: 10px;
    margin-bottom: 12px;
    border-radius: 14px;
    padding: 10px;
    background-color: #f9fafb;
  }

  .place-image {
    width: 120px;
    height: 80px;
    object-fit: cover;
    border-radius: 12px;
  }

  .place-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .place-header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 4px;
  }

  .place-name {
    margin: 0;
    font-size: 14px;
  }

  .btn-add {
    border-radius: 999px;
    padding: 4px 10px;
    border: none;
    background-color: #2563eb;
    color: #ffffff;
    font-size: 11px;
    cursor: pointer;
  }

  .btn-add:disabled {
    background-color: #9ca3af;
    cursor: default;
  }

  .place-time {
    font-size: 12px;
    color: #6b7280;
    margin-bottom: 4px;
  }

  .place-description {
    margin: 0;
    font-size: 12px;
    color: #4b5563;
  }

  /* Chatbot Page */
  .chatbot-page {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 12px 12px 70px;
  }

  .chatbot-header h3 {
    margin: 0 0 4px;
  }

  .chatbot-header p {
    margin: 0 0 10px;
    font-size: 13px;
    color: #6b7280;
  }

  .chatbot-messages {
    flex: 1;
    overflow-y: auto;
    padding: 6px 0 8px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .chat-message {
    max-width: 75%;
    padding: 8px 10px;
    border-radius: 14px;
    font-size: 13px;
    line-height: 1.4;
  }

  .chat-message-user {
    align-self: flex-end;
    background-color: #2563eb;
    color: #ffffff;
    border-bottom-right-radius: 4px;
  }

  .chat-message-bot {
    align-self: flex-start;
    background-color: #e5e7eb;
    color: #111827;
    border-bottom-left-radius: 4px;
  }

  .chatbot-input-bar {
    display: flex;
    padding-top: 6px;
    border-top: 1px solid #e5e7eb;
    gap: 8px;
  }

  .chatbot-input {
    flex: 1;
    border-radius: 999px;
    border: 1px solid #d1d5db;
    padding: 8px 12px;
    resize: none;
    font-size: 13px;
    min-height: 38px;
    max-height: 80px;
  }

  .chatbot-input:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.3);
  }

  .chatbot-send-btn {
    align-self: flex-end;
  }

  /* Profile Page */
  .profile-page {
    padding: 16px 16px 80px;
  }

  .profile-header-card {
    display: flex;
    gap: 12px;
    background-color: #ffffff;
    border-radius: 18px;
    padding: 12px 14px;
    box-shadow: 0 10px 26px rgba(15, 23, 42, 0.1);
    margin-bottom: 16px;
  }

  .profile-avatar {
    width: 56px;
    height: 56px;
    border-radius: 999px;
    object-fit: cover;
  }

  .profile-info h3 {
    margin: 0 0 4px;
  }

  .profile-email {
    margin: 0 0 2px;
    font-size: 13px;
    color: #6b7280;
  }

  .profile-login-type {
    margin: 0;
    font-size: 12px;
    color: #4b5563;
  }

  .profile-section {
    margin-bottom: 16px;
  }

  .profile-section h4 {
    margin: 0 0 8px;
  }

  .profile-empty-text {
    margin: 0;
    font-size: 13px;
    color: #6b7280;
  }

  .profile-trip-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .profile-trip-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    border-radius: 12px;
    padding: 8px 10px;
    box-shadow: 0 6px 14px rgba(15, 23, 42, 0.06);
  }

  .profile-trip-name {
    font-size: 14px;
    font-weight: 500;
  }

  .profile-trip-time {
    font-size: 12px;
    color: #6b7280;
  }

  .profile-logout-btn {
    width: 100%;
  }
`;

// ============================================
// MOCK DATA & CONSTANTS
// ============================================

const BUDGET_OPTIONS = [
  { value: 'low', label: 'Low: ₹1,000 – ₹5,000' },
  { value: 'medium', label: 'Medium: ₹5,000 – ₹15,000' },
  { value: 'high', label: 'High: ₹20,000+' },
];

const TRAVELER_TYPES = [
  { value: 'solo', label: 'Solo (1 person)' },
  { value: 'couple', label: 'Couple (2 people)' },
  { value: 'family', label: 'Family (3–6 people)' },
];

const HOME_QUICK_SECTIONS = [
  {
    title: 'Food',
    icon: '🍽️',
    subcategories: [
      { key: 'food_veg', label: 'Veg' },
      { key: 'food_non_veg', label: 'Non-Veg' },
    ],
  },
  {
    title: 'Fuel & Charging',
    icon: '⛽',
    subcategories: [
      { key: 'fuel_petrol', label: 'Petrol Pumps' },
      { key: 'fuel_ev', label: 'EV Charging Stations' },
    ],
  },
  {
    title: 'Hospitals & Emergency',
    icon: '🚨',
    subcategories: [
      { key: 'emergency_hospital', label: 'Hospitals' },
      { key: 'emergency_police', label: 'Police Stations' },
      { key: 'emergency_medical', label: 'Medical Shops' },
    ],
  },
];

const CATEGORIES = [
  { key: 'temples', icon: '🛕', label: 'Temples' },
  { key: 'must_visit', icon: '📍', label: 'Must Visit Places' },
  { key: 'food_special', icon: '🍽️', label: 'Food & Regional Special Food' },
  { key: 'shopping', icon: '🛍️', label: 'Shopping' },
];

const CATEGORY_TITLES = {
  temples: 'Temples',
  must_visit: 'Must Visit Places',
  food_special: 'Food & Regional Special Food',
  shopping: 'Shopping',
  food_veg: 'Veg Food',
  food_non_veg: 'Non-Veg Food',
  fuel_petrol: 'Petrol Pumps',
  fuel_ev: 'EV Charging Stations',
  emergency_hospital: 'Hospitals',
  emergency_police: 'Police Stations',
  emergency_medical: 'Medical Shops',
};

// Mock API function
const mockFetchPlaces = async (categoryKey) => {
  const mockPlaces = {
    temples: [
      {
        id: 'temple-1',
        name: 'Sri Kanaka Durga Temple',
        imageUrl: 'https://via.placeholder.com/120x80?text=Temple1',
        openTime: '05:00 AM',
        closeTime: '09:00 PM',
        description: 'Ancient temple with stunning architecture and serene atmosphere.',
      },
      {
        id: 'temple-2',
        name: 'Kankipadu Temple',
        imageUrl: 'https://via.placeholder.com/120x80?text=Temple2',
        openTime: '06:00 AM',
        closeTime: '08:00 PM',
        description: 'Famous temple dedicated to Lord Shiva.',
      },
    ],
    must_visit: [
      {
        id: 'place-1',
        name: 'Prakasam Barrage',
        imageUrl: 'https://via.placeholder.com/120x80?text=Place1',
        openTime: '06:00 AM',
        closeTime: '06:00 PM',
        description: 'Beautiful barrage across the Krishna river.',
      },
      {
        id: 'place-2',
        name: 'Bhavani Island',
        imageUrl: 'https://via.placeholder.com/120x80?text=Place2',
        openTime: '09:00 AM',
        closeTime: '05:00 PM',
        description: 'Island with adventure activities and water sports.',
      },
    ],
    food_special: [
      {
        id: 'food-1',
        name: 'Andhra Biryani House',
        imageUrl: 'https://via.placeholder.com/120x80?text=Food1',
        openTime: '11:00 AM',
        closeTime: '11:00 PM',
        description: 'Authentic Andhra biryani and traditional dishes.',
      },
      {
        id: 'food-2',
        name: 'Rayalaseema Kitchen',
        imageUrl: 'https://via.placeholder.com/120x80?text=Food2',
        openTime: '12:00 PM',
        closeTime: '10:00 PM',
        description: 'Regional Rayalaseema cuisine specializing in meat dishes.',
      },
    ],
    shopping: [
      {
        id: 'shop-1',
        name: 'CMR Central Mall',
        imageUrl: 'https://via.placeholder.com/120x80?text=Shop1',
        openTime: '10:00 AM',
        closeTime: '10:00 PM',
        description: 'Modern shopping mall with local and international brands.',
      },
      {
        id: 'shop-2',
        name: 'Suryabagh Market',
        imageUrl: 'https://via.placeholder.com/120x80?text=Shop2',
        openTime: '09:00 AM',
        closeTime: '09:00 PM',
        description: 'Traditional market with handicrafts and souvenirs.',
      },
    ],
    food_veg: [
      {
        id: 'veg-1',
        name: 'Green Garden Restaurant',
        imageUrl: 'https://via.placeholder.com/120x80?text=Veg1',
        openTime: '11:00 AM',
        closeTime: '10:00 PM',
        description: 'Pure vegetarian restaurant with diverse cuisine.',
      },
      {
        id: 'veg-2',
        name: 'Vegetarian Delight',
        imageUrl: 'https://via.placeholder.com/120x80?text=Veg2',
        openTime: '12:00 PM',
        closeTime: '09:00 PM',
        description: 'South Indian vegetarian specialties.',
      },
    ],
    food_non_veg: [
      {
        id: 'nonveg-1',
        name: 'Biryani Palace',
        imageUrl: 'https://via.placeholder.com/120x80?text=NonVeg1',
        openTime: '11:00 AM',
        closeTime: '11:00 PM',
        description: 'Chicken and meat specialties.',
      },
      {
        id: 'nonveg-2',
        name: 'Seafood Harbor',
        imageUrl: 'https://via.placeholder.com/120x80?text=NonVeg2',
        openTime: '12:00 PM',
        closeTime: '10:00 PM',
        description: 'Fresh seafood dishes.',
      },
    ],
    fuel_petrol: [
      {
        id: 'petrol-1',
        name: 'Shell Petrol Pump - Opp Krishna Hospital',
        imageUrl: 'https://via.placeholder.com/120x80?text=Petrol1',
        openTime: '24 Hours',
        closeTime: '24 Hours',
        description: 'Shell fuel station with convenience store.',
      },
      {
        id: 'petrol-2',
        name: 'Bharat Petrol - Main Road',
        imageUrl: 'https://via.placeholder.com/120x80?text=Petrol2',
        openTime: '05:00 AM',
        closeTime: '11:00 PM',
        description: 'BPCL petrol pump with repairs facility.',
      },
    ],
    fuel_ev: [
      {
        id: 'ev-1',
        name: 'EV Charging Hub - CMR Mall',
        imageUrl: 'https://via.placeholder.com/120x80?text=EV1',
        openTime: '09:00 AM',
        closeTime: '10:00 PM',
        description: 'Fast charging stations for electric vehicles.',
      },
      {
        id: 'ev-2',
        name: 'Tesla Supercharger - Tech Park',
        imageUrl: 'https://via.placeholder.com/120x80?text=EV2',
        openTime: '24 Hours',
        closeTime: '24 Hours',
        description: 'Premium EV charging infrastructure.',
      },
    ],
    emergency_hospital: [
      {
        id: 'hosp-1',
        name: 'Krishna Hospital & Medical Center',
        imageUrl: 'https://via.placeholder.com/120x80?text=Hosp1',
        openTime: '24 Hours',
        closeTime: '24 Hours',
        description: 'Multi-specialty hospital with emergency services.',
      },
      {
        id: 'hosp-2',
        name: 'Apollo Hospitals',
        imageUrl: 'https://via.placeholder.com/120x80?text=Hosp2',
        openTime: '24 Hours',
        closeTime: '24 Hours',
        description: 'Advanced medical facilities and specialists.',
      },
    ],
    emergency_police: [
      {
        id: 'police-1',
        name: 'City Police Station',
        imageUrl: 'https://via.placeholder.com/120x80?text=Police1',
        openTime: '24 Hours',
        closeTime: '24 Hours',
        description: 'Main police station for emergency assistance.',
      },
      {
        id: 'police-2',
        name: 'Traffic Police Control Room',
        imageUrl: 'https://via.placeholder.com/120x80?text=Police2',
        openTime: '24 Hours',
        closeTime: '24 Hours',
        description: 'Traffic management and emergency response.',
      },
    ],
    emergency_medical: [
      {
        id: 'med-1',
        name: 'Health Care Pharmacy',
        imageUrl: 'https://via.placeholder.com/120x80?text=Med1',
        openTime: '08:00 AM',
        closeTime: '10:00 PM',
        description: 'Full-service pharmacy with prescription medications.',
      },
      {
        id: 'med-2',
        name: '24-Hour Medical Shop',
        imageUrl: 'https://via.placeholder.com/120x80?text=Med2',
        openTime: '24 Hours',
        closeTime: '24 Hours',
        description: 'Round the clock medical supplies.',
      },
    ],
  };

  return mockPlaces[categoryKey] || [];
};

// ============================================
// COMPONENTS
// ============================================

// Login Page Component
const LoginPage = ({ onLoginSuccess }) => {
  const handleGoogleLogin = () => {
    const mockGoogleUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      loginType: 'Google',
    };
    onLoginSuccess(mockGoogleUser);
  };

  const handleGuestLogin = () => {
    const guestUser = {
      name: 'Guest User',
      email: 'guest@example.com',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest',
      loginType: 'Guest',
    };
    onLoginSuccess(guestUser);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">🌍 Tourism Guide</h1>
        <p className="login-subtitle">
          Personalized trip planning for your next journey.
        </p>

        <button className="btn btn-primary login-btn" onClick={handleGoogleLogin}>
          Continue with Google
        </button>

        <div className="login-divider">
          <span>or</span>
        </div>

        <button className="btn btn-outline login-btn" onClick={handleGuestLogin}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

// Trip Planner Step 1
const TripPlannerStep1 = ({ onContinue }) => {
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [destination, setDestination] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [budget, setBudget] = useState('medium');
  const [travelerType, setTravelerType] = useState('solo');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!fromDate || !toDate) {
      setError('Please select both From and To dates.');
      return;
    }
    if (!useCurrentLocation && !destination.trim()) {
      setError('Please provide a destination or use current location.');
      return;
    }
    setError('');
    onContinue({
      useCurrentLocation,
      destination: destination.trim(),
      fromDate,
      toDate,
      budget,
      travelerType,
    });
  };

  return (
    <div className="trip-step">
      <h4>Trip Details</h4>

      <div className="form-group">
        <label className="form-label">Location</label>
        <div className="location-row">
          <button
            className={`location-toggle ${useCurrentLocation ? 'active' : ''}`}
            onClick={() => setUseCurrentLocation(true)}
            type="button"
          >
            Use Current City
          </button>
          <button
            className={`location-toggle ${!useCurrentLocation ? 'active' : ''}`}
            onClick={() => setUseCurrentLocation(false)}
            type="button"
          >
            Enter Destination
          </button>
        </div>
        {!useCurrentLocation && (
          <input
            className="form-control"
            type="text"
            placeholder="Enter destination city"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        )}
      </div>

      <div className="form-group">
        <label className="form-label">From Date</label>
        <input
          type="date"
          className="form-control"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">To Date</label>
        <input
          type="date"
          className="form-control"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Budget Standard</label>
        <select
          className="form-control"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        >
          {BUDGET_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Traveler Type</label>
        <select
          className="form-control"
          value={travelerType}
          onChange={(e) => setTravelerType(e.target.value)}
        >
          {TRAVELER_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="trip-error">{error}</p>}

      <button className="btn btn-primary trip-continue-btn" onClick={handleSubmit}>
        Continue
      </button>
    </div>
  );
};

// Trip Planner Step 2
const TripPlannerStep2 = ({ tripConfig, onCategoryClick }) => {
  return (
    <div className="trip-step">
      <h4>Select Categories</h4>

      {tripConfig && (
        <div className="trip-summary">
          <div>
            <span className="trip-summary-label">Dates:</span> {tripConfig.fromDate} –{' '}
            {tripConfig.toDate}
          </div>
          <div>
            <span className="trip-summary-label">Budget:</span> {tripConfig.budget}
          </div>
          <div>
            <span className="trip-summary-label">Traveler:</span> {tripConfig.travelerType}
          </div>
        </div>
      )}

      <div className="trip-category-grid">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            className="trip-category-card"
            onClick={() => onCategoryClick(cat.key)}
          >
            <div className="trip-category-icon">{cat.icon}</div>
            <div className="trip-category-label">{cat.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Trip Planner Modal
const TripPlannerModal = ({ onClose, onCategorySelect }) => {
  const [step, setStep] = useState(1);
  const [tripConfig, setTripConfig] = useState(null);

  const handleStep1Complete = (data) => {
    setTripConfig(data);
    setStep(2);
  };

  const handleCategoryClick = (categoryKey) => {
    onCategorySelect(categoryKey);
    onClose();
  };

  return (
    <div className="trip-modal-backdrop">
      <div className="trip-modal">
        <div className="trip-modal-header">
          <button
            className="trip-modal-back-btn"
            onClick={step === 1 ? onClose : () => setStep(1)}
          >
            {step === 1 ? 'Close' : 'Back'}
          </button>
          <h3>Trip Planner</h3>
          <span />
        </div>

        <div className="trip-modal-body">
          {step === 1 && <TripPlannerStep1 onContinue={handleStep1Complete} />}
          {step === 2 && (
            <TripPlannerStep2
              tripConfig={tripConfig}
              onCategoryClick={handleCategoryClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Category List Page
const CategoryListPage = ({ categoryKey, onBack, mode }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedTripPlaces, addPlaceToTrip } = useContext(TripPlannerContext);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await mockFetchPlaces(categoryKey);
        setPlaces(data);
      } catch (err) {
        console.error('Failed to load places', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [categoryKey]);

  const isInTrip = (id) => selectedTripPlaces.some((p) => p.id === id);

  return (
    <div className="category-list-overlay">
      <div className="category-list-container">
        <div className="category-list-header">
          <button className="category-list-back" onClick={onBack}>
            Back
          </button>
          <h3>{CATEGORY_TITLES[categoryKey] || 'Places'}</h3>
          <span />
        </div>

        <div className="category-list-body">
          {loading ? (
            <p>Loading places...</p>
          ) : places.length === 0 ? (
            <p>No places found.</p>
          ) : (
            places.map((place) => (
              <div key={place.id} className="place-card">
                <img
                  className="place-image"
                  src={place.imageUrl}
                  alt={place.name}
                />
                <div className="place-info">
                  <div className="place-header-row">
                    <h4 className="place-name">{place.name}</h4>
                    <button
                      className="btn-add"
                      disabled={isInTrip(place.id)}
                      onClick={() => addPlaceToTrip(place)}
                    >
                      {isInTrip(place.id) ? '✓' : 'Add +'}
                    </button>
                  </div>
                  <div className="place-time">
                    {place.openTime} - {place.closeTime}
                  </div>
                  <p className="place-description">{place.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Home Page
const HomePage = () => {
  const [showTripPlanner, setShowTripPlanner] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [quickSectionKey, setQuickSectionKey] = useState(null);

  const handleOpenTripPlanner = () => {
    setShowTripPlanner(true);
  };

  const handleCloseTripPlanner = () => {
    setShowTripPlanner(false);
  };

  const handleCategorySelect = (categoryKey) => {
    setActiveCategory(categoryKey);
    setQuickSectionKey(null);
  };

  const handleQuickSectionSelect = (key) => {
    setQuickSectionKey(key);
    setActiveCategory(null);
  };

  const closeLists = () => {
    setActiveCategory(null);
    setQuickSectionKey(null);
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <h2>Welcome</h2>
        <p>Plan and manage your perfect trip.</p>
      </div>

      <div className="trip-planner-card" onClick={handleOpenTripPlanner}>
        <div className="trip-planner-content">
          <h3>📋 Trip Planner Dashboard</h3>
          <p>Tap to start planning your personalized trip.</p>
        </div>
        <div className="trip-planner-arrow">➜</div>
      </div>

      <div className="home-sections">
        {HOME_QUICK_SECTIONS.map((section) => (
          <div key={section.title} className="home-section-card">
            <div className="home-section-header">
              <span className="home-section-icon">{section.icon}</span>
              <span className="home-section-title">{section.title}</span>
            </div>
            <div className="home-section-buttons">
              {section.subcategories.map((sub) => (
                <button
                  key={sub.key}
                  className="home-section-chip"
                  onClick={() => handleQuickSectionSelect(sub.key)}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showTripPlanner && (
        <TripPlannerModal
          onClose={handleCloseTripPlanner}
          onCategorySelect={handleCategorySelect}
        />
      )}

      {activeCategory && (
        <CategoryListPage
          categoryKey={activeCategory}
          onBack={closeLists}
          mode="trip"
        />
      )}

      {quickSectionKey && (
        <CategoryListPage
          categoryKey={quickSectionKey}
          onBack={closeLists}
          mode="quick"
        />
      )}
    </div>
  );
};

// Chatbot Page
const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'bot',
      text: 'Hi! I can help you with tourism questions and trip suggestions. What would you like to know?',
    },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      from: 'user',
      text: input.trim(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');

    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        from: 'bot',
        text: 'Thanks for your question! I can help you find the best places to visit, restaurants, and more based on your preferences. Tell me more about what you\'re interested in!',
      };
      setMessages((prev) => [...prev, reply]);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-header">
        <h3>💬 Tourism Chatbot</h3>
        <p>Ask for help, suggestions, or information.</p>
      </div>

      <div className="chatbot-messages">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`chat-message ${
              m.from === 'user' ? 'chat-message-user' : 'chat-message-bot'
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="chatbot-input-bar">
        <textarea
          className="chatbot-input"
          placeholder="Ask about places, food, routes..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button className="btn btn-primary chatbot-send-btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

// Profile Page
const ProfilePage = ({ onLogout }) => {
  const { user } = useContext(AuthContext);
  const { selectedTripPlaces, removePlaceFromTrip } = useContext(TripPlannerContext);

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-header-card">
        <img src={user.photoUrl} alt={user.name} className="profile-avatar" />
        <div className="profile-info">
          <h3>{user.name}</h3>
          <p className="profile-email">{user.email}</p>
          <p className="profile-login-type">
            Login type: <strong>{user.loginType}</strong>
          </p>
        </div>
      </div>

      <div className="profile-section">
        <h4>Selected Trip Plan</h4>
        {selectedTripPlaces.length === 0 ? (
          <p className="profile-empty-text">No places added to your trip yet.</p>
        ) : (
          <div className="profile-trip-list">
            {selectedTripPlaces.map((place) => (
              <div key={place.id} className="profile-trip-item">
                <div>
                  <div className="profile-trip-name">{place.name}</div>
                  <div className="profile-trip-time">
                    {place.openTime} - {place.closeTime}
                  </div>
                </div>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => removePlaceFromTrip(place.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="profile-section">
        <button className="btn btn-primary profile-logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

// Main App Layout
const MainAppLayout = () => {
  const [currentTab, setCurrentTab] = useState('home');

  return (
    <div className="app-shell">
      <div className="app-content">
        {currentTab === 'home' && <HomePage />}
        {currentTab === 'chatbot' && <ChatbotPage />}
        {currentTab === 'profile' && (
          <ProfilePage
            onLogout={() => {
              // Logout is handled in main App
            }}
          />
        )}
      </div>

      <nav className="bottom-nav">
        <button
          className={`bottom-nav-item ${currentTab === 'home' ? 'bottom-nav-item-active' : ''}`}
          onClick={() => setCurrentTab('home')}
        >
          <span className="bottom-nav-icon">🏠</span>
          <span className="bottom-nav-label">Home</span>
        </button>
        <button
          className={`bottom-nav-item ${currentTab === 'chatbot' ? 'bottom-nav-item-active' : ''}`}
          onClick={() => setCurrentTab('chatbot')}
        >
          <span className="bottom-nav-icon">💬</span>
          <span className="bottom-nav-label">Chatbot</span>
        </button>
        <button
          className={`bottom-nav-item ${currentTab === 'profile' ? 'bottom-nav-item-active' : ''}`}
          onClick={() => setCurrentTab('profile')}
        >
          <span className="bottom-nav-icon">👤</span>
          <span className="bottom-nav-label">Profile</span>
        </button>
      </nav>
    </div>
  );
};

// ============================================
// MAIN APP
// ============================================

export default function App() {
  const [user, setUser] = useState(null);
  const [selectedTripPlaces, setSelectedTripPlaces] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('tourism_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('tourism_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('tourism_user');
    setSelectedTripPlaces([]);
  };

  const addPlaceToTrip = (place) => {
    setSelectedTripPlaces((prev) => {
      const exists = prev.find((p) => p.id === place.id);
      if (exists) return prev;
      return [...prev, place];
    });
  };

  const removePlaceFromTrip = (placeId) => {
    setSelectedTripPlaces((prev) => prev.filter((p) => p.id !== placeId));
  };

  return (
    <>
      <style>{globalStyles}</style>
      <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}>
        <TripPlannerContext.Provider
          value={{
            selectedTripPlaces,
            addPlaceToTrip,
            removePlaceFromTrip,
          }}
        >
          {!user ? (
            <LoginPage onLoginSuccess={handleLogin} />
          ) : (
            <MainAppLayout />
          )}
        </TripPlannerContext.Provider>
      </AuthContext.Provider>
    </>
  );
}