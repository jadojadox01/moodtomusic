'use client';

import { useState, useEffect } from 'react';

export default function PlaylistPage() {
  const [playlist, setPlaylist] = useState([]);
  const [currentVideoId, setCurrentVideoId] = useState('');

  // Load playlist from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('userPlaylist') || '[]');
    setPlaylist(saved);
  }, []);

  // Save playlist to localStorage when playlist changes
  useEffect(() => {
    localStorage.setItem('userPlaylist', JSON.stringify(playlist));
  }, [playlist]);

  const removeFromPlaylist = (id) => {
    setPlaylist(prev => prev.filter(item => item.id !== id));
    if (currentVideoId === id) setCurrentVideoId('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-16 px-4">
      
      {/* Header */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-4xl font-bold text-center md:text-left">My Playlist</h1>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <a
            href="/generate"
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition-colors text-center"
          >
            Generate Playlist
          </a>
          <a
            href="/"
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors text-center"
          >
            Home
          </a>
        </div>
      </div>

      {/* Video Player */}
      {currentVideoId && (
        <div className="mb-10 w-full max-w-4xl aspect-video rounded-lg overflow-hidden shadow-lg">
          <iframe
            key={currentVideoId}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Playlist Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlist.map(item => (
          <div key={item.id} className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200">
            <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-bold text-lg line-clamp-2">{item.title}</h3>
              {item.mood && <p className="text-gray-400 text-sm">{item.mood}</p>}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setCurrentVideoId(item.id)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors text-sm"
                >
                  Play
                </button>
                <button
                  onClick={() => removeFromPlaylist(item.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty Playlist Message */}
      {playlist.length === 0 && (
        <p className="text-gray-400 mt-10 text-center text-lg">Your playlist is empty!</p>
      )}
    </div>
  );
}
