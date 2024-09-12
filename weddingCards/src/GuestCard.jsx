import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import guestCardBackground from './assets/NEEMAATTTTTT.svg';

const GuestCard = ({ guest, weddingDetails, onScan }) => {
  return (
    <div className="relative w-full h-96 bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
      <img src={guestCardBackground} alt="Card Background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative z-10 p-6 flex flex-col h-full">
        <div className="flex-grow">
          
        </div>
        <div className="flex flex-col items-center">
          <QRCodeSVG 
            value={`https://2f07-41-90-37-57.ngrok-free.app/api/guests/${guest.id}/scan`} 
            size={80}
            className="mb-4"
          />
          <button 
            onClick={() => onScan(guest.id)} 
            className={`${
              guest.scanned 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-purple-500 hover:bg-purple-700'
            } text-white font-bold py-2 px-4 rounded transition duration-300`}
            disabled={guest.scanned}
          >
            {guest.scanned ? 'Already Scanned' : 'Scan QR Code'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestCard;