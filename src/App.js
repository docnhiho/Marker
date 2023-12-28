
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  const [markers, setMarkers] = useState([]); //marker
  const [selectedMarker, setSelectedMarker] = useState(null); //select market for comment
  const [commentsMap, setCommentsMap] = useState({}); //contains comments have id marker
  const [comment, setComment] = useState(''); //comment
  const [isModalOpen, setIsModalOpen] = useState(false); //open modal

  const handleImageClick = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const markerId = `${offsetX}-${offsetY}`;
    const newMarker = { id: markerId, x: offsetX, y: offsetY };
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]); //create marker
    setCommentsMap((prevCommentsMap) => ({ ...prevCommentsMap, [markerId]: [] })); //create empty session in list comment

  };

  const handleMarkerClick = (event, marker) => {
    event.stopPropagation();
    setSelectedMarker(marker);
    setIsModalOpen(true);
  };

  const handleCommentSubmit = () => {
    const currentMarkerId = selectedMarker.id;
    const currentComments = commentsMap[currentMarkerId];
    const newComment = { text: comment };

    // New comments will be added to the comment list
    const updatedCommentsMap = {
      ...commentsMap,
      [currentMarkerId]: [...currentComments, newComment],
    };
    
    setCommentsMap(updatedCommentsMap); //update state new comment 
    setComment('');
  };

  return (
    <div className="App">
      <div className="relative" style={{ width: '500px', height: '500px' }} onClick={handleImageClick}>
        <img src={require('./heart.png')} alt="Mark this image" className="absolute w-full h-full" />
        {markers.map((marker) => (
          <div
            key={marker.id}
            className="absolute"
            style={{ left: marker.x, top: marker.y, cursor: 'pointer' }}
            onClick={(event) => handleMarkerClick(event, marker)}
          >📍
          </div>
        ))}
      </div>

      {/* open modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Comments Modal"
        style={
          { content: { width: '300px', height: '400px', margin: 'auto' } }
        }
      >
        <h2 className="text-lg font-bold mb-2">Comments for Marker</h2>
        <div className="mb-2">
          {commentsMap[selectedMarker?.id]?.map((comment, index) => (  // show all comments 
            <div key={index}>{comment.text}</div>
          ))}
        </div>
        <textarea
          className="w-full p-2 mb-2 border border-gray-400 rounded"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="3"
        ></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCommentSubmit}>
          Add Comment
        </button>
      </Modal>
    </div>
  );
}

export default App;










