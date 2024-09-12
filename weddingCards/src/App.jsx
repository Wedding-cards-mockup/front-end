import { useState, useEffect } from 'react';
import axios from 'axios';
import GuestCard from './GuestCard';
import WelcomeModal from './WelcomeModal';

const weddingDetails = {
  couple: "John Doe & Jane Smith",
  date: "December 31, 2023",
  venue: "Grand Hotel, New York"
};

function App() {
  const [guests, setGuests] = useState([]);
  const [currentGuest, setCurrentGuest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchGuests();
    const interval = setInterval(checkForScannedGuests, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchGuests = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/guests');
      setGuests(response.data);
    } catch (error) {
      console.error('Error fetching guests:', error);
    }
  };

  const checkForScannedGuests = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/guests');
      const updatedGuests = response.data;
      const newlyScannedGuest = updatedGuests.find(
        (updatedGuest) => 
          updatedGuest.scanned && 
          !guests.find((g) => g.id === updatedGuest.id).scanned
      );
      if (newlyScannedGuest) {
        setCurrentGuest(newlyScannedGuest);
        setShowModal(true);
        setGuests(updatedGuests);
      }
    } catch (error) {
      console.error('Error checking for scanned guests:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Wedding Invitation</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {guests.map(guest => (
            <GuestCard 
              key={guest.id} 
              guest={guest} 
              weddingDetails={weddingDetails}
            />
          ))}
        </div>
      </div>
      {showModal && currentGuest && (
        <WelcomeModal 
          guest={currentGuest} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
}

export default App;