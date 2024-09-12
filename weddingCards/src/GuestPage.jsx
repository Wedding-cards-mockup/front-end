import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import GuestCard from './GuestCard';

const weddingDetails = {
  couple: "John Doe & Jane Smith",
  date: "December 31, 2023",
  venue: "Grand Hotel, New York"
};

function GuestPage() {
  const [guest, setGuest] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchGuest = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/guest/${id}`);
        setGuest(response.data);
      } catch (error) {
        console.error('Error fetching guest:', error);
      }
    };

    fetchGuest();
  }, [id]);

  if (!guest) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 py-6 px-4 flex items-center justify-center">
      <GuestCard 
        guest={guest} 
        weddingDetails={weddingDetails}
      />
    </div>
  );
}

export default GuestPage;
