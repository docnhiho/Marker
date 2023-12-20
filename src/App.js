import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css';

const customModalStyles = {
  content: {
    width: '300px', 
    height: '200px', 
    margin: 'auto',
  },
};

function App() {
  const [markers, setMarkers] = useState([
    { id: 1, x: 158, y: 122, comment: 'Point 1' },
    { id: 2, x: 342, y: 122, comment: 'Point 2' },
    { id: 3, x: 249, y: 376, comment: 'Point 3' },
  ]);

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [comment, setComment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setComment(marker.comment || ''); // Set comment from marker or empty string if undefined
    setIsModalOpen(true);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleModalClose = () => {
    // Update comment in markers array
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === selectedMarker.id ? { ...marker, comment } : marker
      )
    );
    setSelectedMarker(null);
    setIsModalOpen(false);
  };

  return (
    <div style={{ position: 'relative', width: '500px', height: '500px' }}>
      <img
        src={require('./heart.png')} // Replace with your image source
        alt="Your Image Alt Text" // Replace with your alt text
        style={{ width: '100%', height: '100%' }}
      />

      {markers.map((marker) => (
        <div
          key={marker.id}
          className="marker"
          style={{ position: 'absolute', left: marker.x, top: marker.y, cursor: 'pointer' }}
          onClick={() => handleMarkerClick(marker)}
        >
          📍
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel=""
        style={customModalStyles}
      >
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Comment..."
          style={{ width: '100%', height: '80%' }}
        />
        <button onClick={handleModalClose}>Save</button>
      </Modal>
    </div>
  );
}

export default App;
